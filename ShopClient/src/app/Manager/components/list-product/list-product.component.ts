import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent
/* implements OnInit  */ {
  listProducts: Product[] = [];
  preview: string = "";
  titleModal: string = "";

  constructor(
    private _productService: ProductService,
    private _router: Router, //!
    private _activateRoute: ActivatedRoute,
    private _changeDetector:ChangeDetectorRef
  ) {
    this._activateRoute.data.subscribe((data: any) => {
      this.listProducts = data.productList;
    })

  }
/*   ngOnInit(): void {
      this._productService.getAllProducts().subscribe((data) => {
        console.log(data);
        this.listProducts = data;
      })
    }  */
    deleteProduct(product: Product) {
      //TODO DOBLE VERIFICACIÓN -> MODAL
      this._productService
        .deleteProduct(product._id)
        .pipe(
          catchError((error) => {
            console.warn(error)
            if (error.status === 500) {
              alert(error.error);
            } else {
              console.error('Unknown error');
            }
            throw error;
          })
        )
        .subscribe(() => {
          this.listProducts = this.listProducts.filter((elem) => elem._id !== product._id);
          this._changeDetector.detectChanges();
        });
    }
  
  editProduct(product: Product) { //!
    const productString = JSON.stringify(product);
    const productSerialized = encodeURIComponent(productString);
    this._router.navigate(['admin', 'edit-product', productSerialized]);
  }

  reSizeImg(product: Product) {
    this.titleModal = product.name;
    this.preview = product.img;
  }

}
