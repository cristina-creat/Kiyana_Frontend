/** @module app/pages/admin/dashboard */

/**
 * @description Dashboard module, delcare imports, exports, providers and declarations
 * 
 */

// Require global angular dependencies
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AspectRatioModule } from '../../../shared/aspect-ratio/aspect-ratio.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BreadcrumbsModule } from 'app/core/breadcrumbs/breadcrumbs.module';


export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    FormsModule,
    BreadcrumbsModule,

    // Core
    AspectRatioModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [DashboardComponent],
  exports: [RouterModule]
})
export class DashboardModule {
}
