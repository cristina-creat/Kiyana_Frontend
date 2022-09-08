/** @class app/pages/admin/users */

/**
 * @description Users page, includes html & css templates
 * 
 */

// Require angular dependencies
import { AfterViewInit, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
// Require node modules
import * as _ from 'lodash';
// Require models
import { ListColumn } from '../../../shared/list/list-column.model';
import { User } from '../../../models/user.model';
import { Role } from '../../../models/role.model';
// Require services
import { LoginService } from 'app/services/login.service';
import { UsersService } from '../../../services/users.service';
import { RolesService } from '../../../services/roles.service';
import { UtilsService } from 'app/services/utils.service';
import { CatalogService } from 'app/services/catalogs.service';
// Require components to display as a modals
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';
import { BulkResultComponent } from './bulk-result/bulk-result.component';

// Implements decorator Component
// Define selector & html template
@Component({
  selector: 'fury-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, AfterViewInit {
  // Link to HTML button to import bulk users
  @ViewChild('importUsersButton') importUsersButton: ElementRef;

  // Store tenant data
  tenant: any;
  // Store tenant roles
  roles: Role[];
  // Store tenant users list
  users: User[];

  // Columns list from the Mat Table
  @Input()
  columns: ListColumn[] = [
    { name: 'ID', property: 'id_colaborador', visible: true, isModelProperty: false },
    { name: 'Nombre', property: 'firstname', visible: true, isModelProperty: true },
    { name: 'Apellidos', property: 'lastname', visible: true, isModelProperty: true },
    { name: 'Email', property: 'email', visible: true, isModelProperty: true },
    { name: 'Activo', property: 'active', visible: true, isModelProperty: false },
    { name: 'Perfil', property: 'role', visible: true, isModelProperty: false },
    { name: 'Acciones', property: 'actions', visible: true },
  ] as ListColumn[];
  pageSize = 50;
  dataSource: MatTableDataSource<User> | null;

  // Link to HTML components
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // Initialize component
  constructor(
    private dialog: MatDialog,
    private utilsService: UtilsService,
    private usersService: UsersService,
    private rolesService: RolesService,
    public loginService: LoginService,
    public router: Router,
    ) {
      this.loginService.loading = true; 
      this.tenant = this.loginService.getTenant();
  }

  // Get function, return list of columns with property visible = true
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }


  // Auto exec function when component is loaded
  ngOnInit() {
    // Initialize 
    this.dataSource = new MatTableDataSource();
    // Get users list from backend
    this.usersService.getAll().subscribe(
      users => {
        this.users = users['data'];
        this.dataSource.data = this.users;
        this.loginService.loading = false;
      },
      err => {
        this.loginService.loading = false;
        this.loginService.displayMessage('Ha ocurrido un error al cargar los usuarios');
        console.log( err );  
    });

    // Get roles list from backend
    this.rolesService.getAll( this.tenant._tenant._id ).subscribe( roles =>{
      this.roles = roles['data'];
    },
    err =>{
      this.loginService.displayMessage('Ha ocurrido un error al cargar los roles');
      console.log( err );
    });
    
  }

  // Initialize Table components once DOM has been loaded
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Display modal for user creation
  createUser() {
    this.dialog.open(UserCreateUpdateComponent,{data: {roles: this.roles}}).afterClosed().subscribe((user: User) => {
      /**
       * User is the updated user (if the user pressed Save - otherwise it's null)
       */
      if (user) {
        // Validate email dont exists in current list
        let tmp_user = null;
        if ( tmp_user = this.users.find( el => el.email == user.email) ) {
          this.loginService.displayMessage('El usuario ya se encuentra registrado en la empresa');
          // Redirect to edit page
          this.router.navigate(['/app/users/edit/'+tmp_user._id]);
          return;
        }
        
        this.loginService.loading = true;
        // Save or update user if not already exists, and then redirect to edit page
        this.usersService.saveOrUpdate(user).subscribe( (res) => {
            this.loginService.loading = false;
            if(res.message || !res.data || !res.data._id){
              this.loginService.displayMessage( 'Ha ocurrido un error al crear el usuario. ' );
            } else {
              this.router.navigate(['/app/users/edit/'+res.data._id]);
            }
          },
          (err) => {
            this.loginService.displayMessage( "Ha ocurrido un error al guardar la información." );
            console.log( err );
        } );
        
      }
    });
  }

  // Remove current user from the tenant
  deleteUser( user ){
    if(confirm("¿Estás seguro de borrar el usuario?")){
      this.usersService.delete(user).subscribe( (res) => {
        if(res.message){
          this.loginService.displayMessage( res.message );
        } else {
          this.users.splice(this.users.map( el => {return el._id;} ).indexOf(user._id), 1);
          this.loginService.displayMessage( 'El usuario ha sido eliminado.' );
          this.dataSource.data = this.users;
        }
      });
    }
  }

  // Filter data when search field has changed
  onFilterChange(value) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  // Exports users lists as excel
  exportUsers() {
    var perfiles = {};
    if ( !this.roles ) {
      this.loginService.displayMessage('No se ha podido obtener el listado de perfiles de usuario.');
      return;
    }
    this.roles.forEach( el => {
      perfiles[el._id] = el.name;
    })
    var user_model = new User();
    var exportables = user_model.exportables()
    
    var data = _.cloneDeep(this.users);
    
    data = data.map( el => {
      Object.keys( el._tenants ).forEach( key => {
        el['tenant_'+key] = el._tenants[key];
      });
      Object.keys( el ).forEach( key => {
        if ( !exportables.includes(key) ) {
          delete el[key];
        }
      });
      el['tenant__role'] = ( perfiles[el['tenant__role']] ) ? perfiles[el['tenant__role']] : '';
      return el;
    });
    this.utilsService.exportJsonAsExcelFile( data, 'usuarios', exportables );
    
  }

  // Load users from an excel, should be a defined format
  importUsers( event: any ) {
    var file = event.target.files[0];     
    this.utilsService.importExcelFileAsArray( file ).then(
      data => {
        this.importUsersButton.nativeElement.value = null;
        data = this.utilsService.arrayToObject( data );
        
        var perfiles = {};
        this.roles.forEach( el => {
          perfiles[el.name] = el._id;
        })

        // Convert Role Name to Role ID
        data = data.map( el => {
          el['tenant__role'] = ( perfiles[el['tenant__role']] ) ? perfiles[el['tenant__role']] : undefined;
          // Convert tenant to object
          el._tenant = {};
          Object.keys( el ).forEach( key => {
            if ( key.indexOf('tenant_') === 0 ) {
              console.log('replace')
              let subkey = key.replace('tenant_','');
              el._tenant[ subkey ] = el[ key ];
              delete el[key];
            }
          });
          return el;
        });

        // Get only users that has a role assigned
        let count_non_role = data.filter( el => !el._tenant._role );
        if ( count_non_role.length ) {
          alert( count_non_role.length + ' usuarios no serán actualizados porque no cuentan con un perfil de usuario válido.')
        }

        // Send users to the backend
        this.usersService.bulkUsers( data ).subscribe(
          usersUpdated => {
            this.displayBulkDialog( usersUpdated );
            this.ngOnInit();
          },
          err => {
            this.loginService.loading = false;
            this.loginService.displayMessage('Ha ocurrido un error al cargar los usuarios');
            console.log( err );  
        });
        
      }
    ).catch( err => {
      this.importUsersButton.nativeElement.value = null;
      console.error( err );
    });
  }

  // Display results to a dialog
  displayBulkDialog( result: any ) {
    const dialogRef = this.dialog.open(BulkResultComponent, {
      width: '600px',
      panelClass: 'checkout-details',
      data: result
    });
  }

}
