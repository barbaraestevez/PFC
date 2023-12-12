import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';



@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
    DashboardRoutingModule,
  ]
})
export class ShopModule { }
