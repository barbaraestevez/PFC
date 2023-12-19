// Importa módulos y clases de Angular relacionadas con el enrutamiento
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa los componentes que se utilizarán como páginas en las rutas
import { LoginComponent } from './Login/components/login/login.component';
import { SignUpComponent } from './Login/components/sign-up/sign-up.component';
import { isLoggedGuard } from './guards/is-logged.guard';
import { hasRoleGuard } from './guards/has-role.guard';

// Define las rutas de la aplicación
const routes: Routes = [
  {
    path: '',               // Ruta raíz, muestra el componente LoginComponent
    component: LoginComponent
  },
  {
    path: 'sign-up',        // Ruta para mostrar el componente SignUpComponent
    component: SignUpComponent
  },
  {
    path: 'admin',          // Ruta para cargar el módulo ManagerModule de manera perezosa
    loadChildren: () =>
      import('./Manager/manager.module').then(
        (m) => m.ManagerModule
      ),
    canMatch: [isLoggedGuard, hasRoleGuard(['Admin', 'Employee', 'Seller', 'Customer'])]
  },
  {
    path: 'shop',          // Ruta para cargar el módulo ManagerModule de manera perezosa
    loadChildren: () =>
      import('./Shop/shop.module').then(
        (m) => m.ShopModule
      ),
    canMatch: [isLoggedGuard]
  },
  {
    path: '**',             // Ruta de comodín para redirigir a la ruta raíz si la URL no coincide con ninguna ruta definida
    redirectTo: '',
    pathMatch: 'full'
  }
];

// NgModule que configura y exporta las rutas
@NgModule({
  imports: [RouterModule.forRoot(routes)],   // Configura las rutas para la aplicación
  exports: [RouterModule]                   // Exporta el módulo de enrutamiento para su uso en la aplicación
})
export class AppRoutingModule { }


// En resumen, este archivo define las rutas principales de la aplicación Angular.
//  Las rutas incluyen una ruta raíz que muestra el componente LoginComponent, 
// una ruta para mostrar el componente SignUpComponent, y una ruta para cargar
//  de manera perezosa el módulo ManagerModule cuando se accede a la ruta 'admin'.
//  Además, hay una ruta de comodín que redirige a la ruta raíz si la URL
//  no coincide con ninguna ruta definida.