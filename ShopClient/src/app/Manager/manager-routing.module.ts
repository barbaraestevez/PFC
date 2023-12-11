import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagerComponent } from './manager.component';
import { ProductService } from '../services/product.service';
import { hasRoleGuard } from '../guards/has-role.guard';



const routes: Routes = [
  {
    path:'',
    component: ManagerComponent, //shop
    children: [
      {
        path:'list-product',
        component: ListProductComponent,
        resolve: { productList: () => inject(ProductService).getAllProducts()},
        //canMatch:[hasRoleGuard(['Admin', 'Customer'])]
      },
      {
        path:'create-product',
        component: CreateProductComponent,
       // canMatch:[hasRoleGuard(['Admin', 'Employee'])]
      },
      {
        path:'edit-product/:product',
        component: CreateProductComponent,
       // canMatch:[hasRoleGuard(['Admin'])]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ManagerRoutingModule { }
