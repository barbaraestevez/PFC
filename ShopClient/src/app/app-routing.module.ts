import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/components/login/login.component';
import { SignUpComponent } from './Login/components/sign-up/sign-up.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { hasRoleGuard } from './guards/has-role.guard';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path:'sign-up',
    component: SignUpComponent
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./Manager/manager.module').then(
        (m) => m.ManagerModule
      ),
    //canMatch:[hasRoleGuard(['Admin', 'Employee']), isLoggedGuard],
    canMatch:[isLoggedGuard, hasRoleGuard(['Admin', 'Employee'])],
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./Shop/shop.module').then(
        (m) => m.ShopModule
      ),
   canMatch:[isLoggedGuard],
  },
  {
    path:'**',
    redirectTo:'',
    pathMatch:'full' //prefix
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
