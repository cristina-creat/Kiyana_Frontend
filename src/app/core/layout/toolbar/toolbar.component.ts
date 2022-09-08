import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'fury-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Input('quickpanel') quickpanel: MatSidenav;
  tenant: any;

  constructor(
    public loginService: LoginService
  ) {
    this.tenant = loginService.getTenant();
  }

  ngOnInit() { }


}
