/** @module app/pages/admin/conciliaciones */

/**
 * @description Conciliaciones module, delcare imports, exports, providers and declarations
 * 
 */

// Require global angular dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConciliacionesRoutingModule } from './conciliaciones-routing.module';
import { ConciliacionesComponent } from './conciliaciones.component';
import { ListModule } from 'app/shared/list/list.module';
import { MaterialModule } from 'app/shared/material-components.module';
import { MainPipeModule } from 'app/pipes/main-pipe.module';
import { NewComponent } from './new/new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConciliadorService } from 'app/services/conciliador.service';
import { ResultsComponent } from './results/results.component';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { MatStepperModule } from '@angular/material';


@NgModule({
  declarations: [
    ConciliacionesComponent,
    ResultsComponent,
    NewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ListModule,
    MainPipeModule,
    ConciliacionesRoutingModule,
    BreadcrumbsModule,
    MatStepperModule // Material module for wizard step
  ],
  providers: [ConciliadorService],
  entryComponents: [NewComponent]
})
export class ConciliacionesModule { }
