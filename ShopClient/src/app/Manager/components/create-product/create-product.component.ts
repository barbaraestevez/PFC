import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { catchError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  title:string = "Crear Producto";
  productForm: FormGroup;

  preview!:string //la exclamación 

  constructor(private _fb:FormBuilder, private _productService:ProductService, private _router:Router, private _activatedRoute:ActivatedRoute){
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
    
  }

  addProduct() {
    if(this.productForm.valid){
      const isLocalFile = this.productForm.get('isLocalFile')?.value;
      // this.productForm.patchValue({ img:this.preview});

      const PRODUCT: Product = {
        name: this.productForm.get('name')?.value,
        category: this.productForm.get('category')?.value,
        location: this.productForm.get('location')?.value,
        price: this.productForm.get('price')?.value,
        isLocalFile: isLocalFile,
        img: (isLocalFile)? this.preview:this.productForm.get('img')?.value,
      }
      this.createProduct(PRODUCT);
    }
  }

  createProduct(product:Product) {
    this._productService.saveProduct(product).pipe //el pipe hay que hacerlo antes de la subscripción
    (catchError(error => { //er o error -> en este caso es lo mismo
      if(error.status === 500) { //er o error -> en este caso es lo mismo
        alert(error.error); //er o error -> en este caso es lo mismo
        this.productForm.patchValue({img:''});
        this.preview = '';
      } else {
        console.error('Error desconocido');
      }
      throw error; //er o error -> en este caso es lo mismo
    }
    )
    ).subscribe(
      (data) => {
        this._router.navigate(['admin','list-product'],{relativeTo:this._activatedRoute});
      }
        
    )
  }

  setImg(event:any) {
    if (this.productForm.get('isLocalFile')?.value){
      const file = event.target.files[0];
      if(file && file.type.startsWith('image/')) {
        this.extractBase64(file).then(
          (img:any)=>{
            this.preview = img.base;
            console.log('Imagen válida.\n' + img.base);
          }
        )
      } else {
        alert ('Tipo de archivo no válido. Debe seleccionar una imagen.');
        this.productForm.patchValue({img:''});
        this.preview = '';
      }
    } else {
      this.preview = this.productForm.get('img')?.value;
    }
    console.log(event);
  }

  validateInput(param:string):boolean{ //typeName. Se ha cambiado typeName por param
    let obj = this.productForm.get(param); //typeName. Se ha cambiado typeName por param
    return obj !==null && obj?.invalid && obj.touched;
  }

  extractBase64 = async ($event:any) => new Promise((resolve, reject) => {
  try {
    const reader = new FileReader();
    reader.readAsDataURL($event);
    reader.onload = () => {
      resolve ({
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
  }
  )

}
