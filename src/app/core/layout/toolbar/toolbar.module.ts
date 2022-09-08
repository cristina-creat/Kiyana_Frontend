import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FuryCardModule } from '../../../shared/card/card.module';
import { ClickOutsideModule } from '../../../shared/click-outside/click-outside.module';
import { MaterialModule } from '../../../shared/material-components.module';
import { ScrollbarModule } from '../../../shared/scrollbar/scrollbar.module';
import { ToolbarSettingsComponent } from './toolbar-settings/toolbar-settings.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';
import { ToolbarSidenavMobileToggleComponent } from './toolbar-sidenav-mobile-toggle/toolbar-sidenav-mobile-toggle.component';
import { ToolbarUserButtonComponent } from './toolbar-user-button/toolbar-user-button.component';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarEmailComponent } from './toolbar-email/toolbar-email.component';
import { ToolbarHelpComponent } from './toolbar-help/toolbar-help.component';
import { ToolbarMyBusinessComponent } from './toolbar-my-business/toolbar-my-business.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToolbarTranslateComponent } from './toolbar-translate/toolbar-translate.component';

export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ScrollbarModule,
    FormsModule,
    ClickOutsideModule,
    FuryCardModule,

    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    ToolbarComponent,
    ToolbarUserButtonComponent,
    ToolbarNotificationsComponent,
    ToolbarSettingsComponent,
    ToolbarSidenavMobileToggleComponent,
    ToolbarEmailComponent,
    ToolbarHelpComponent,
    ToolbarMyBusinessComponent,
    ToolbarTranslateComponent,
    
  ],
  exports: [ToolbarComponent],
})
export class ToolbarModule {
}
