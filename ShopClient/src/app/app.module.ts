import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './Login/components/login/login.component';
import { SignUpComponent } from './Login/components/sign-up/sign-up.component';
import { ManagerModule } from './Manager/manager.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ShopModule } from './Shop/shop.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // ReactiveFormsModule -> está declarado en el archivo "manager.module.ts"
    AppRoutingModule,
    ManagerModule,
    ShopModule,
 //   BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
