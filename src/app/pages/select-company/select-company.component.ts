/** @class app/pages/select-company */

/**
 * @description This page is usefull when user is assigned to more than 1 company
 * 
 */

// Require angular dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Require environment config
import { environment } from 'environments/environment';
// Require login service
import { LoginService } from '../../services/login.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'benefits-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {

  // Initialize services
  constructor(public router: Router, public loginService:LoginService) { }
  
  // Local var for avatar company
  apiUrl: String = environment.avatarsUrl;
  // Local var to store all user tenants assigned
  tenants:any = this.loginService.tenants;

  ngOnInit() {
  }

  // When user has choosen a tenant
  redirect( tenant: any ){
    this.loginService.selectTenant( tenant );
    this.loginService.redirectLogin();
  }

  // Do logout session
  close(){
    this.loginService.doLogout()
  }
}
