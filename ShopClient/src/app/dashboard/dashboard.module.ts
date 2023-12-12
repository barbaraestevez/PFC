import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgRolesDirective } from './directives/ng-roles.directive';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NgRolesDirective,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent
  ]
})
export class DashboardModule { }