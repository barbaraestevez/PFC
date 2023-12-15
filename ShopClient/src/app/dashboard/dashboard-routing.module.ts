import { NgModule, inject } from '@angular/core';
import { ManagerComponent } from '../Manager/manager.component';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from '../Manager/components/list-product/list-product.component';
import { ProductService } from '../services/product.service';
import { CreateProductComponent } from '../Manager/components/create-product/create-product.component';
import { ShopComponent } from '../Shop/shop.component';
import { HomeComponent } from '../Shop/components/home/home.component';
import { CartComponent } from '../Shop/components/cart/cart.component';
import { hasRoleGuard } from '../guards/has-role.guard';


// Define las rutas del módulo
const routes: Routes = [
  {
    path: '', // Ruta base para el componente ManagerComponent (o 'shop' según el comentario)
    component: ManagerComponent,
    children: [
      {
        path: 'list-product', // Ruta para mostrar la lista de productos
        component: ListProductComponent, // Componente asociado a la ruta
        resolve: { productList: () => inject(ProductService).getAllProducts() }, // Resuelve la lista de productos antes de cargar el componente
/*         canMatch: [hasRoleGuard(['Admin', 'Employee','Customer'])] */
      },
      {
        path: 'create-product', // Ruta para crear un nuevo producto
        component: CreateProductComponent, // Componente asociado a la ruta
        canActivate: [hasRoleGuard(['Admin', 'Employee'])]
      },
      {
        path: 'edit-product/:product', // Ruta para editar un producto existente
        component: CreateProductComponent, // Componente asociado a la ruta
/*         canMatch: [hasRoleGuard(['Employee'])] */
      },
    ]
  },
  {
    path: '', // Ruta base para el componente ManagerComponent (o 'shop' según el comentario)
    component: ShopComponent,
    children: [
      {
        path: 'home', // Ruta para mostrar la lista de productos
        component: HomeComponent, // Componente asociado a la ruta
/*         resolve: { productList: () => inject(ProductService).getAllProducts() }, */ // Resuelve la lista de productos antes de cargar el componente
/*         canMatch: [hasRoleGuard(['Admin', 'Employee','Customer'])] */
      },
      {
        path: 'cart', // Ruta para crear un nuevo producto
        component: CartComponent, // Componente asociado a la ruta
/*         canMatch: [hasRoleGuard(['Admin'])] */
      },
    ]
  }
];

// Define y configura el módulo de enrutamiento
@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa el módulo RouterModule con las rutas definidas
  exports: [RouterModule] // Exporta el módulo RouterModule para su uso fuera de este módulo
})
export class DashboardRoutingModule { }