import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material-components.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { KiolinkPopupMessageComponent } from './kiolink-popup-message/kiolink-popup-message.component';
import { KiolinkPopupScaleComponent } from './kiolink-popup-scale/kiolink-popup-scale.component';
import { SelectCompanyComponent } from './select-company/select-company.component'

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ConfirmDialogComponent, KiolinkPopupMessageComponent, KiolinkPopupScaleComponent, SelectCompanyComponent],
  entryComponents: [ConfirmDialogComponent, KiolinkPopupMessageComponent, KiolinkPopupScaleComponent]
})
export class DialogsModule { }
