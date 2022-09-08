import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogoutGuard } from 'app/logout.guard';
import { ForgotPasswordComponent } from './forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent,
    canActivate: [LogoutGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotPasswordRoutingModule { }
