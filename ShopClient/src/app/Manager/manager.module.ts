import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalImgComponent } from './components/list-product/modal-img/modal-img.component';




@NgModule({
  declarations: [
    ManagerComponent,
    CreateProductComponent,
    ListProductComponent,
    ModalImgComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManagerRoutingModule,
  ]
})
export class ManagerModule { }
