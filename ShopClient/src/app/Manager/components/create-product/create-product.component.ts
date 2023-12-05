import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { Role } from 'src/app/models/roles.type';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  title: string = "Crear Producto";
  productForm: FormGroup;

  preview!: string;

  currentProduct!: Product; //?

  constructor
    (
      private _fb: FormBuilder,
      private _productService: ProductService,
      private _router: Router,
      private _activatedRoute: ActivatedRoute //?
    ) {

    this.productForm = this._fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      img: ['', [Validators.required]],
      price: ['', [Validators.required]],
      isLocalFile: [true]
    })

  }

  ngOnInit(): void {
    this.asEdit();
  }

  addProduct() {
    if (this.productForm.valid) {
      const isLocalFile = this.productForm.get('isLocalFile')?.value;

      const PRODUCT: Product = {
        name: this.productForm.get('name')?.value,
        category: this.productForm.get('category')?.value,
        location: this.productForm.get('location')?.value,
        price: this.productForm.get('price')?.value,
        isLocalFile: isLocalFile,
        img: (isLocalFile) ? this.preview : this.productForm.get('img')?.value,
      }
      if (!this.currentProduct) {
        this.createProduct(PRODUCT);
      } else {
        this.editProduct(PRODUCT);
      }

    }
  }

  editProduct(product: Product) { //!
    this._productService
      .updateOneProduct(this.currentProduct._id, product)
      .pipe(catchError(error => this.managedErrors(error)))
      .subscribe((data) => {
        alert(data);
        this._router.navigate(['admin', 'list-product'])
      }
      );
  }

  createProduct(product: Product) { //!
    this._productService
      .saveProduct(product)
      .pipe(catchError(error => {
        if (error.status === 500) {
          alert(error.error);
          this.productForm.patchValue({ img: '' });
          this.preview = '';
        } else {
          console.error('Error Desconocido');
        }
        throw error;
      }
      ))
      .subscribe((data) => {
        alert(data);
        this._router.navigate(['/admin/list-product'])
      });
  }

  setImg(event: any) {
    if (this.productForm.get('isLocalFile')?.value) {
      const file = event.target.files[0];
      if (file && file.type.startsWith('image/')) {
        this.extractBase64(file).then(
          (img: any) => {
            this.preview = img.base;
            console.log('Imagen Valida.\n' + img.base);
          }
        )
      } else {
        alert('Tipo de archivo no válido. Debe seleccionar una imagen.');
        this.productForm.patchValue({ img: '' });
        this.preview = '';
      }
    } else {
      this.preview = this.productForm.get('img')?.value;
    }
  }

  validateInput(param: string): boolean {
    let obj = this.productForm.get(param);
    return obj !== null && obj.invalid && obj?.touched;
  }

  extractBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        })
      }
      reader.onerror = error => {
        reject({
          base: null
        })
      }
    } catch (error) {
      console.log(error);
    }
  })

  asEdit() { //!
    this._activatedRoute.paramMap.subscribe((data) => {
      const productSerialized = data.get('product') || '';

      if (productSerialized) {
        this.currentProduct = JSON.parse(decodeURIComponent(productSerialized));
        this.title = 'Editar Producto';
        this.preview = this.currentProduct.img;

        this.productForm.setValue({
          name: this.currentProduct.name,
          category: this.currentProduct.category,
          location: this.currentProduct.location,
          img: this.currentProduct.img,
          price: this.currentProduct.price,
          isLocalFile: false
        });
      }
    })
  }


  private managedErrors(error: any) { //!
    if (error.status === 500) {
      alert(error.error);
      this.productForm.patchValue({ img: '' });
      this.preview = '';
    } else {
      console.error('Error Desconocido');
    }
    // throw error;
    return error;
  }
}
