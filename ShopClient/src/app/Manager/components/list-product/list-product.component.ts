// Resumen
// Este componente Angular(ListProductComponent) maneja la visualización de una lista de productos,
//  permitiendo eliminar, editar y cambiar el tamaño de las imágenes.

// Se utiliza inyección de dependencias para acceder a servicios y funcionalidades 
// proporcionadas por Angular.La suscripción a datos proporcionados por la ruta activada 
// y el uso de ChangeDetectorRef garantizan la actualización adecuada de la interfaz de usuario.

// Importa módulos y clases necesarios de Angular y otras dependencias
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

// Componente Angular decorado
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent /* implements OnInit */ {
  // Arreglo para almacenar la lista de productos
  listProducts: Product[] = [];
  // Variables para los productos a la venta

  // Variables para la vista previa de la imagen y el título del modal
  preview: string = "";
  titleModal: string = "";

  // Constructor del componente
  constructor(
    private _productService: ProductService,    // Inyección del servicio ProductService para interactuar con productos
    private _router: Router,                     // Inyección del servicio Router para la navegación entre rutas
    private _activateRoute: ActivatedRoute,      // Inyección del servicio ActivatedRoute para obtener información sobre la ruta activada
    private _changeDetector: ChangeDetectorRef   // Inyección del servicio ChangeDetectorRef para detectar cambios y forzar la actualización de la vista
  ) {
    // Suscribe a los datos proporcionados por la ruta activada y actualiza la lista de productos
    this._activateRoute.data.subscribe((data: any) => {
      this.listProducts = data.productList.products;
    })
  }

  /* ngOnInit(): void {
    // Método del ciclo de vida del componente que se ejecuta al inicializarlo
    this._productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.listProducts = data;
    })
  } */

  addProductToSalesCorner(product: Product, percentBenefit: string, productStock: string) {
    // TODO: Lógica de añadir producto al puesto de venta
    let percentBenefitNum = Number(percentBenefit);
    let productStockNum = Number(productStock);
    console.log(percentBenefitNum + " " + productStockNum);
    console.log(percentBenefitNum + productStockNum);
    console.log(product);
  }
  // Método para eliminar un producto
  deleteProduct(product: Product) {
    Swal.fire({
      title: "Estás seguro que quieres eliminar el producto?",
      text: "Esta acción no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      // Llama al servicio para eliminar el producto por su ID
      if (result.isConfirmed) {
        this._productService
          .deleteProduct(product._id)
          .subscribe((data) => {
            // Filtra y actualiza la lista de productos después de eliminar el producto
            if (data.success) {
              // this.listProducts = this.listProducts.filter((elem) => elem._id !== product._id);
              this._productService.getAllProducts().subscribe((response) => this.listProducts = response.products);
            }
            // Detecta cambios y fuerza la actualización de la vista
            // this._changeDetector.detectChanges();
          });
      }
    });


  }

  // Método para editar un producto
  editProduct(product: Product) {
    // Serializa el producto a una cadena JSON, lo codifica y navega a la ruta de edición con el producto serializado
    const productString = JSON.stringify(product);
    const productSerialized = encodeURIComponent(productString);
    this._router.navigate(['admin', 'edit-product', productSerialized]);
  }

  // Método para cambiar el tamaño de la imagen y mostrarla en un modal
  reSizeImg(product: Product) {
    // Actualiza el título del modal y la vista previa de la imagen
    this.titleModal = product.name;
    this.preview = product.img;
  }
}
