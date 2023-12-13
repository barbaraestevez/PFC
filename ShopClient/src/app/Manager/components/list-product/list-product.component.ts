import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent
/* implements OnInit  */ {
  listProducts: Product[] = [];
  //variables para los productos a la venta
  productStock:number = 1;
  percentBenefit:number = 10;

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
    addProductoToSalesCorner(product: Product){
      //TODO  Lógica de añadir producto al puesto de venta
    }
    deleteProduct(product: Product) {
      //TODO DOBLE VERIFICACIÓN -> MODAL
      // Muestra un cuadro de confirmación con SweetAlert2
        Swal.fire({
          title: '¿Estás seguro?',
          text: 'Esta acción no se puede deshacer.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sí, borrarlo',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            // El usuario ha confirmado la eliminación
            this._productService
              .deleteProduct(product._id)
              .pipe(
                catchError((error) => {
                  console.warn(error);
                  if (error.status === 500) {
                    // Muestra un mensaje de error con SweetAlert2
                    Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: error.error,
                    });
                  } else {
                    console.error('Unknown error');
                  }
                  throw error;
                })
              )
              .subscribe(() => {
                this.listProducts = this.listProducts.filter((elem) => elem._id !== product._id);
                this._changeDetector.detectChanges();
      
                // Muestra un mensaje de éxito con SweetAlert2
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'El producto ha sido eliminado correctamente.',
                });
              });
          }
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
