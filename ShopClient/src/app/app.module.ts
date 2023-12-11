import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/components/login/login.component';
import { SignUpComponent } from './Login/components/sign-up/sign-up.component';
import { ManagerModule } from './Manager/manager.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './dashboard/footer/header/header.component';
import { FooterComponent } from './dashboard/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ManagerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule // ReactiveFormsModule -> está declarado en el archivo "manager.module.ts"
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
