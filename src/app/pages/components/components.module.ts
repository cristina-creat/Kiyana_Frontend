import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from '../../shared/highlightjs/highlight.module';
import { MaterialModule } from '../../shared/material-components.module';
import { ScrollbarModule } from '../../shared/scrollbar/scrollbar.module';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { InputComponent } from './input/input.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressComponent } from './progress/progress.component';
import { RadioComponent } from './radio/radio.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { SliderComponent } from './slider/slider.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

    // Core
    HighlightModule,
    ScrollbarModule
  ],
  declarations: [
    ComponentsComponent,
    AutocompleteComponent,
    ButtonsComponent,
    CardsComponent,
    CheckboxComponent,
    InputComponent,
    GridListComponent,
    ListsComponent,
    MenuComponent,
    ProgressComponent,
    ProgressSpinnerComponent,
    RadioComponent,
    SliderComponent,
    SnackBarComponent,
    TooltipComponent,
    SlideToggleComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
}
