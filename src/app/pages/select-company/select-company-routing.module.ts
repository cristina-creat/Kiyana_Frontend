/** @module app/pages/select-company */

/**
 * @description Define local routes for this module
 * 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectCompanyComponent } from './select-company.component';


const routes: Routes = [
  {
    path: '',
    component: SelectCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectCompanyRoutingModule {
}
