/** @module app/pages/admin/users */

/**
 * @description Users module, delcare imports, exports, providers and declarations
 * 
 */

// Require global angular dependencies
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../core/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../shared/list/list.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserCreateUpdateModule } from './user-create-update/user-create-update.module';
import { MainPipeModule } from 'app/pipes/main-pipe.module';
import { MyDatePickerModule } from 'mydatepicker';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UtilsService } from 'app/services/utils.service';
import { CatalogService } from 'app/services/catalogs.service';
import { BulkResultComponent } from './bulk-result/bulk-result.component';
import { PasswordComponent } from './user-edit/password/password.component';
import { MyAccountComponent } from './my-account/my-account.component';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MainPipeModule,
    MyDatePickerModule,
    // Core
    ListModule,
    UserCreateUpdateModule,
    BreadcrumbsModule
  ],
  declarations: [UsersComponent, UserEditComponent, BulkResultComponent, PasswordComponent, MyAccountComponent],
  entryComponents: [BulkResultComponent, PasswordComponent],
  providers: [UtilsService, CatalogService],
  exports: [UsersComponent]
})
export class UsersModule {
}
