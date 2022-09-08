/** @class app/pages/admin/users/my-account */

/**
 * @description My user account edit page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
// Require models
import { User } from 'app/models/user.model';
// Require services
import { RolesService } from 'app/services/roles.service';
import { CatalogService } from 'app/services/catalogs.service';
import { LoginService } from 'app/services/login.service';
import { MeService } from 'app/services/me.service';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
  providers: [CatalogService, MeService]
})
export class MyAccountComponent implements OnInit {

  // User can edit content boolean flag
  userCanEdit: boolean = true;
  user: User;
  // Show/hide password imput
  passwordType: string = 'password';
  // Global main profiles (not dynamic)
  mainProfiles: any[] = [
    {
      key: 'Administrador Global',
      value: 'Admin'
    },
    {
      key: 'Suscriptor',
      value: 'Subscriber'
    }
  ];

  // Current tenant data
  tenant: any;
  // Define empty breadcrumbs for header
  breadcrumbs_crumbs: any[] = [''];
  
  // Initialize component
  constructor(
    private meService: MeService,
    public loginService: LoginService,
    public location: Location
  ) {
    this.tenant = this.loginService.getTenant();
  }

  // Auto exec function when component is loaded
  ngOnInit() {
    // Get my user data from backend
    this.meService.getMe().subscribe(user => {
      this.user = user;

    });
  }

  // Update user data
  saveUser() {
    // Send to backend, validate data on backend
    this.meService.updateUser(this.user).subscribe((res) => {
      
      if (res.message) {
        this.loginService.displayMessage(res.message);
      } else {
        this.loginService.displayMessage('La información ha sido actualizada.');
        this.user['password'] = '';
        // this.loginService.goBack();
      }
    },
      (err) => {
        console.log(err);
        this.loginService.displayMessage('Ha ocurrido un error al guardar la información');
      });

  }

}
