/** @module app/pages/auth/forgot-password */

/**
 * @description Forgot password module, delcare imports, exports, providers and declaratios
 * 
 */

// Require global angular dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'app/shared/material-components.module';


@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    ForgotPasswordRoutingModule
  ]
})
export class ForgotPasswordModule { }
