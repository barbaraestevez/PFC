import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagerComponent } from './manager.component';



const routes: Routes = [
  {
    path:'',
    component: ManagerComponent, //shop
    children: [
      {
        path:'list-product',
        component: ListProductComponent
      },
      {
        path:'create-product',
        component: CreateProductComponent
      },
      {
        path:'edit-product/:id',
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
