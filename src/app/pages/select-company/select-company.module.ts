/** @module app/pages/select-company */

/**
 * @description Select company module, delcare imports, exports, providers and declaratios
 * 
 */

// Require global angular dependencies

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCompanyComponent } from './select-company.component';
import { SelectCompanyRoutingModule } from './select-company-routing.module';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { MaterialModule } from '../../shared/material-components.module';
import { ListModule } from 'app/shared/list/list.module';


@NgModule({
  imports: [
    CommonModule,
    SelectCompanyRoutingModule,
    BreadcrumbsModule,
    MaterialModule,
    ListModule
  ],
  declarations: [SelectCompanyComponent]
})
export class SelectCompanyModule { }
