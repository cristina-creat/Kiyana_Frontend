/** @module app/pages/admin/company */

/**
 * @description Company module, delcare imports, exports, providers and declaratios
 * 
 */

// Require global angular dependencies
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ColorTwitterModule } from 'ngx-color/twitter';
import { CompanyComponent } from './company.component';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../shared/list/list.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { TenanService } from 'app/services/tenant.service';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyRolesComponent } from './company-edit/company-roles/company-roles.component';
import { CompanyRoleCreateUpdateComponent } from './company-edit/company-roles/company-role-create-update/company-role-create-update.component';
import { MatTreeModule } from '@angular/material';
import { MainPipeModule } from 'app/pipes/main-pipe.module';
import { CompanyConfigComponent } from './company-edit/company-config/company-config.component';



@NgModule({
  imports: [
    CommonModule,
    BreadcrumbsModule,
    ListModule,
    MaterialModule,
    CompanyRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    MainPipeModule,
    MatTreeModule,
    ColorTwitterModule
  ],
  declarations: [CompanyComponent, CompanyEditComponent, CompanyRolesComponent, CompanyRoleCreateUpdateComponent, CompanyConfigComponent],
  entryComponents: [CompanyRoleCreateUpdateComponent],
  providers: [TenanService],
  exports: [CompanyComponent]
})
export class CompanyModule { }
