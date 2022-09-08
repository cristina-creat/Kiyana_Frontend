/** @module app/pages/auth/login */

/**
 * @description Define local routes for this module
 * 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutGuard } from 'app/logout.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LogoutGuard], // This has a guard, if user is already logged in, should be redirected to dashboard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
