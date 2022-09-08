import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'fury-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss']
})
export class ToolbarNotificationsComponent {

  @Input() quickpanel: MatSidenav;

  constructor() { }

  openQuickpanel() {
    this.quickpanel.open();
  }
}
