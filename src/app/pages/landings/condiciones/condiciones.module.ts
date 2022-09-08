/** @module app/pages/landings/condiciones */

/**
 * @description Condiciones module, delcare imports, exports, providers and declaratios
 * 
 */

// Require global angular dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CondicionesRoutingModule } from './condiciones-routing.module';
import { CondicionesComponent } from './condiciones.component';
import { MaterialModule } from 'app/shared/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    CondicionesRoutingModule,
    MaterialModule,
  ],
  declarations: [CondicionesComponent]
})
export class CondicionesModule { }
