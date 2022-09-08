/** @module app/pages/landings/privacidad */

/**
 * @description Privacidad module, delcare imports, exports, providers and declaratios
 * 
 */

// Require global angular dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacidadRoutingModule } from './privacidad-routing.module';
import { PrivacidadComponent } from './privacidad.component';
import { MaterialModule } from 'app/shared/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    PrivacidadRoutingModule,
    MaterialModule,
  ],
  declarations: [PrivacidadComponent]
})
export class PrivacidadModule { }
