/** @module app/pages/admin/company */

/**
 * @description Define local routes for this module
 * 
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyComponent } from './company.component';

const routes: Routes = [
  
  {
    path: '',
    component: CompanyComponent,
    data: {
      scrollbarDisabled: true
    }
  },
  {
    path: 'edit/:id',
    component: CompanyEditComponent,
    data: {
      scrollbarDisabled: true
    }
  },
  {
    path: 'new',
    component: CompanyEditComponent,
    data: {
      scrollbarDisabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {
}
 