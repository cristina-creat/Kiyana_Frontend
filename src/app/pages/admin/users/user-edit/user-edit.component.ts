/** @class app/pages/admin/users/user-edit */

/**
 * @description Users edit page, includes html & css templates
 * 
 */

// Require angular dependencies
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// Require node libraries
import { IMyDpOptions } from 'mydatepicker';
// Require models
import { ListColumn } from 'app/shared/list/list-column.model';
import { User } from 'app/models/user.model';
import { Tenant } from 'app/models/tenant.model';
// Require services
import { RolesService } from 'app/services/roles.service';
import { UsersService } from 'app/services/users.service';
import { CatalogService } from 'app/services/catalogs.service';
import { LoginService } from 'app/services/login.service';
// Require env configuration
import { environment } from 'environments/environment';
// Require password component to use as a modal
import { PasswordComponent } from './password/password.component';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers: [CatalogService]
})
export class UserEditComponent implements OnInit {


  // Var that config calendar options
  myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };
  // Define avatars URL
  avatarUrl: String = environment.avatarsUrl;
  // Roles list
  roles: any[] = [];
  // Tenants list (not in use)
  tenants: Tenant[] = [];
  // Current user data
  user: User;

  // Flag that enable/disable edition
  userCanEdit: boolean = false;
  // To use un page header content
  breadcrumbs_crumbs: any[] = ['Usuarios'];
  // Current tenant data
  tenant: any;
  // Global KIYANA profiles (not dynamic)
  mainProfiles: any[] = [
    {
      key: 'Administrador Global',
      value: 'Admin'
    },
    {
      key: 'Suscriptor',
      value: 'Subscriber'
    }
  ]


  // Initialize component
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private catalogService: CatalogService,
    private rolesService: RolesService,
    private usersService: UsersService,
    public loginService: LoginService,
    public location: Location
  ) {
    this.tenant = this.loginService.getTenant();
  }

  // Auto exec function when component is loaded
  ngOnInit() {


    // Verify permissions to edi
    if (this.loginService.validatePermissionTree('admin', 'users', 'update')) {
      this.userCanEdit = true;
    }

    // Get roles from backend
    this.rolesService.getAll(this.tenant._tenant._id).subscribe(roles => {
      this.roles = roles['data'];
    },
      err => {
        console.log(err);
      });

    // Get user ID from route
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.usersService.getUserById(params['id']).subscribe(user => {
          this.user = user;
        });
      } else {
        this.user = new User();
      }
    });
  }



  // Save user data
  saveUser() {

    // Send full user data (filtering data is made on backend)
    this.usersService.saveOrUpdate(this.user).subscribe((res) => {
      if (res.message) {
        this.loginService.displayMessage(res.message);
      } else {
        if (!this.user._id) {
          this.loginService.goBack();
        }
        this.loginService.displayMessage('El usuario ha sido guardado');
      }
    },
      (err) => {
        console.log(err);
        this.loginService.displayMessage('Ha ocurrido un error al guardar el usuario');
      });

  }

  // Modal page when button is clicked
  displayPasswordPop() {
    this.dialog.open(PasswordComponent, { data: { user: this.user } }).afterClosed().subscribe((result: any) => {
    });
  }


}
