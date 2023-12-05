import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagerComponent } from './manager.component';
import { ProductService } from '../services/product.service';



const routes: Routes = [
  {
    path:'',
    component: ManagerComponent, //shop
    children: [
      {
        path:'list-product',
        component: ListProductComponent,
        resolve: { productList: () => inject(ProductService).getAllProducts()}
      },
      {
        path:'create-product',
        component: CreateProductComponent
      },
      {
        path:'edit-product/:product',
        component: CreateProductComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManagerRoutingModule { }
