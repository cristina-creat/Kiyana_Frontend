import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BackdropModule } from '../../shared/backdrop/backdrop.module';
import { LoadingIndicatorModule } from '../../shared/loading-indicator/loading-indicator.module';
import { MaterialModule } from '../../shared/material-components.module';
import { MediaQueryService } from '../../shared/mediareplay/media-replay.service';
import { LayoutComponent } from './layout.component';
import { QuickpanelModule } from './quickpanel/quickpanel.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { TutorialsComponent } from './tutorials/tutorials.component';
/*
import { AccesKiolinkComponent } from "./tutorials/acces-kiolink/acces-kiolink.component";
import { DcDevicesComponent } from './tutorials/dc-devices/dc-devices.component';
import { ForgotPasswordComponent } from './tutorials/forgot-password/forgot-password.component';
import { InventoryComponent } from './tutorials/inventory/inventory.component';
import { MyProfileComponent } from './tutorials/my-profile/my-profile.component';
import { NewUserComponent } from './tutorials/new-user/new-user.component';
import { ProfileComponent } from './tutorials/profile/profile.component';
import { VisitsComponent } from './tutorials/visits/visits.component';
*/
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,

    // Core
    ToolbarModule,
    QuickpanelModule,
    SidenavModule,
    BackdropModule
  ],
  declarations: [
    LayoutComponent,
    TutorialsComponent,
    /*AccesKiolinkComponent,
    DcDevicesComponent,
    ForgotPasswordComponent,
    InventoryComponent,
    MyProfileComponent,
    NewUserComponent,
    ProfileComponent,
    VisitsComponent,*/
  ],
  providers: [MediaQueryService]
})
export class LayoutModule {
}
