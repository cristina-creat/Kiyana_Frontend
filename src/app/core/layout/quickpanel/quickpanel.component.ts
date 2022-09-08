import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';
import * as moment from 'moment';
import { environment } from 'environments/environment';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'fury-quickpanel',
  templateUrl: './quickpanel.component.html',
  styleUrls: ['./quickpanel.component.scss']
})
export class QuickpanelComponent implements OnInit {
  @Input() private sidenavRef: MatSidenav;

  result: string;
  avatarPath: String = environment.apiUrl + 'avatars/';
  notifications: any[] = [];

  constructor(
    public loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit() {
/*
    this.loginService.getNotifications().then(notifications => {
      if ( notifications.data ) {
        this.notifications = notifications.data.map( el => {
          el.created_at = moment(el.created_at).fromNow();
          return el;
        });      
      }
    });
    */
  }

 


}
