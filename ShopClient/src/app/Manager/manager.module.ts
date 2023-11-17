import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ManagerComponent,
    CreateProductComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
