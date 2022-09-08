import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'fury-toolbar-user-button',
  templateUrl: './toolbar-user-button.component.html',
  styleUrls: ['./toolbar-user-button.component.scss']
})
export class ToolbarUserButtonComponent implements OnInit {

  isOpen: boolean;
  currentTenant: string;
  avatarUrl: String = environment.avatarsUrl;

  constructor(
    public loginService: LoginService,
  ) {
    let tenant = this.loginService.getTenant();
    if ( tenant ) {
      this.currentTenant = tenant._id;
    }
  }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  logout() {
    this.loginService.doLogout();
  }

  selectTenant( tenant: any ) {
    this.loginService.selectTenant( tenant );
    this.loginService.redirectLogin();
    setTimeout( () => {
      window.location.reload();
    }, 500);
  }

}
