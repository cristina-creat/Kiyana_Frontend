/** @module app/pages/admin/settings */

/**
 * @description Settings module, delcare imports, exports, providers and declarations
 * 
 */

// Require global angular dependencies
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AspectRatioModule } from '../../../shared/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { SettingsComponent } from './settings.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';

import { SettingsCatalogsComponent } from './settings-catalogs/settings-catalogs.component';
import { CatalogService } from 'app/services/catalogs.service';
import { NewEditCatalogComponent } from './settings-catalogs/new-edit-catalog/new-edit-catalog.component';
import { CalendarModule } from 'angular-calendar';
import { ListModule } from 'app/shared/list/list.module';



export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    data: {
      scrollbarDisabled: true
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    BreadcrumbsModule,
    ListModule,
    // Core
    AspectRatioModule,
    
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    CalendarModule.forRoot()
  ],
  declarations: [SettingsComponent,SettingsCatalogsComponent, NewEditCatalogComponent],
  entryComponents: [NewEditCatalogComponent],
  providers: [
    CatalogService
  ],
  exports: [RouterModule]
})
export class SettingsModule {
}
