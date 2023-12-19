import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { NgRolesDirective } from './directives/ng-roles.directive';




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
  exports: [
    FooterComponent,
    HeaderComponent,
    NgRolesDirective
  ]
})
export class DashboardModule { }
