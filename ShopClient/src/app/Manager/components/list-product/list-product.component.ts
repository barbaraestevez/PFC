import { ChangeDetectorRef, Component, OnInit  } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent { //implements OnInit
  listProducts: Product[]=[];

  constructor(
    private _productService:ProductService, // _ps = productService
    private _router:Router, //!
    private _changeRef:ChangeDetectorRef ,
    private _activatedRoute:ActivatedRoute //_ar = activatedRoute
  ){
    this._activatedRoute.data.subscribe((data:any) => {
      this.listProducts = data.productList;
    })
  }

  // para eliminar una tarjeta
  // deleteProduct(id:any){
  //   this._ts.delete(id).subscribe(()=>{
  //     this._toastr.error('El producto se ha eliminado con éxito.', 'Registro eliminado');
  //     //llamamos al ngOnInit para refrescar la ventana tras el delete
  //     this.ngOnInit();
  //   });
  // } 
  // ngOnInit() {
    
  // }
  

  // ngOnInit(): void {
  //   this._productService.getAllProducts().subscribe((data)=>{
  //     console.log(data);
  //     this.listProducts = data;
  //   })
  // }

  editProduct(product: Product) { //!
    // console.log('entro en editProduct de list-product');
    const productString = JSON.stringify(product);
    const productSerialized = encodeURIComponent(productString);
    this._router.navigate(['admin', 'edit-product', productSerialized]);
  }

  deleteProduct(product: Product) {
    this._productService
    .deleteProduct(product._id)
    .pipe( //TODO DOBLE VERIFICACIÓN -> MODAL
      catchError((error) => {
        if (error.status === 500) {
          alert(error.error);
        } else {
          console.error ('Ha ocurrido un desastre de error'); //Unknown error
        }

        throw error;
      })
    )
    .subscribe(() => {
      this.listProducts = this.listProducts.filter((elem) => elem._id !== product._id)
      this._changeRef.detectChanges();

      // window.location.reload();
      // this._router.navigate(['admin', 'list']);
    });    
  }
  
  // reSizeImg(product: Product) {
  //   this.titleModal = product.name;
  //   this.preview = product.img;
  // }
}