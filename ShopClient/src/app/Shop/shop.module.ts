import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './shop.component';



@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    ShopComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ShopModule { }
