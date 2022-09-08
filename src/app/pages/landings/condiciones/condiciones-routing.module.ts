import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CondicionesComponent } from './condiciones.component';

const routes: Routes = [
  {
    path: '',
    component: CondicionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicionesRoutingModule { }
