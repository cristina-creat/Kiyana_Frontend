import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'fury-toolbar-help',
  templateUrl: './toolbar-help.component.html',
  styleUrls: ['./toolbar-help.component.scss']
})
export class ToolbarHelpComponent {

  @Input() quickpanel: MatSidenav;

  constructor() { }

  openQuickpanel() {
    this.quickpanel.open();
  }

}
