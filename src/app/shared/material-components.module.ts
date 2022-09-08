import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatChipsModule
} from '@angular/material';
import { DndDirective } from 'app/pages/direcitves/dnd.directive';
import { ProgressComponent } from 'app/pages/components/file-progress/file-progress.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatInputModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatRippleModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    FlexLayoutModule,
    DndDirective,
    ProgressComponent
  ],
  declarations: [
    DndDirective,
    ProgressComponent
  ]
    
})
export class MaterialModule {
}
