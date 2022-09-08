/** @module app/pages/admin/conciliaciones */

/**
 * @description Define local routes for this module
 * 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConciliacionesComponent } from './conciliaciones.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: '',
    component: ConciliacionesComponent,
    data: {
      scrollbarDisabled: true
    }
  },
  {
    path: ':id',
    component: ResultsComponent,
    data: {
      scrollbarDisabled: true
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConciliacionesRoutingModule { }
