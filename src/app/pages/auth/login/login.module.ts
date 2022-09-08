/** @module app/pages/auth/login */

/**
 * @description Login module, delcare imports, exports, providers and declaratios
 * 
 */

// Require global angular dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'app/shared/material-components.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
