/** @module app/app-routing */

/**
 * @description Define global routes to use in this app, if route imports a module, then that module will have its own routes
 * 
 */

// Require global angular dependencies
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// Import guards to prevent login/logout redirect
import { AuthGuard } from "./auth.guard";
import { LogoutGuard } from './logout.guard';
// Import component for base layout
import { LayoutComponent } from './core/layout/layout.component';


// Define routes, if no guard is defined, then the route is public or protected inside module
const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/pages/auth/login/login.module#LoginModule',
    pathMatch: 'full'
  },
  {
    path: 'forgot-password',
    loadChildren: 'app/pages/auth/forgot-password/forgot-password.module#ForgotPasswordModule',
    pathMatch: 'full'
  },
  {
    path: 'politica-de-privacidad',
    loadChildren: 'app/pages/landings/privacidad/privacidad.module#PrivacidadModule',
    pathMatch: 'full'
  },
  {
    path: 'terminos-condiciones',
    loadChildren: 'app/pages/landings/condiciones/condiciones.module#CondicionesModule',
    pathMatch: 'full'
  },
  {
    path: 'select-company',
    loadChildren: 'app/pages/select-company/select-company.module#SelectCompanyModule',
    pathMatch: 'full',
  },
  // app path is the base for authenticated content, protected by guard
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        loadChildren: 'app/pages/admin/dashboard/dashboard.module#DashboardModule'
      },
      { 
        path: 'company', 
        loadChildren: 'app/pages/admin/company/company.module#CompanyModule'
      },
      {
        path: 'users',
        loadChildren: 'app/pages/admin/users/users.module#UsersModule'
      },
      {
        path: 'conciliaciones',
        loadChildren: 'app/pages/admin/conciliaciones/conciliaciones.module#ConciliacionesModule'
      },
      {
        path: 'settings',
        loadChildren: 'app/pages/admin/settings/settings.module#SettingsModule'
      },
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

// Define module for router
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: [AuthGuard, LogoutGuard]
})

// Export routing to use in main module
export class AppRoutingModule {
}
