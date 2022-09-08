import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdToRolePipe } from "./id-to-role.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [IdToRolePipe],
  exports: [IdToRolePipe]
})
export class MainPipeModule { }
