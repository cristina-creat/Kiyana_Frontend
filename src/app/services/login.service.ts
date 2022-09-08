/** @class app/services/login */

/**
 * @description Service to handle global user information
 * 
 */

// Require angular dependencies
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgZone } from '@angular/core';
import 'rxjs/add/operator/map'
// Require layout dependencies
import { SidenavService } from '../core/layout/sidenav/sidenav.service';
import { MatSnackBar } from '@angular/material';
import { SidenavItem } from 'app/core/layout/sidenav/sidenav-item/sidenav-item.interface';
// Require environment configuration
import { environment } from '../../environments/environment';
// Require local libraries
import * as moment from 'moment';

// Decorator to use as a service
@Injectable()
// Export member as a class
export class LoginService {
    // Show/hide loading bar over the interface
    loading: boolean = false;
    // To store current userdata
    identity: any;
    // To store current token to make backend requests
    token: string;
    // List of tenants current user has access
    tenants: any;
    // Flag if the platform is ready
    build: boolean = false;
    // List of global permissions
    permissions: any = [];
    // List of global permissions slugs
    permissions_slugs: any = [];
    
    // Inject http client to make requests
    // Inject router to handle URL params
    // Inject Zone to refresh data when neccessary
    // Inject sidenavService to manage menu options
    // Inject snackBar to display common messages
    constructor(
        private http: HttpClient,
        private router: Router,
        public zone: NgZone,
        private sidenavService: SidenavService,
        private snackBar: MatSnackBar
    ) {
        // If no previous data, build configuration
        if (!this.build)
            this.__construct_data();
    }

    
    /*********************
        PERMISSIONS
    **********************/

    // Build a permissions tree from current identity
    _makePermissionsTree() {

        // If permissions doesn't exists
        if (!this.permissions_slugs)
            return;


        // Sort permissions as a tree in a local variable
        this.permissions_slugs.forEach(element => {
            if (element) {
                var perm = element.split('-');
                if (!this.permissions[perm[0]])
                    this.permissions[perm[0]] = [];
                if (!this.permissions[perm[0]][perm[1]])
                    this.permissions[perm[0]][perm[1]] = [];
                if (this.permissions[perm[0]][perm[1]].indexOf(perm[2]) == -1)
                    this.permissions[perm[0]][perm[1]].push(perm[2]);
            }
        });

        // Remove all menu items
        this.sidenavService.restoreItems();

        // Create an empty list of menu items
        const list_items: SidenavItem[] = [];

        // Insert first menu item
        list_items.push({
            name: 'Dashboard',
            routeOrFunction: '/app/dashboard',
            icon: 'layout.svg',
            position: 10,
            pathMatchExact: true,
            tenantItem: false
        });

        // If user has permissions, insert menu item
        if (this.hasPermission(['admin-tenant-read'])) {
            list_items.push({
                name: 'Empresas',
                routeOrFunction: '/app/company',
                icon: 'company.svg',
                position: 10,
                pathMatchExact: true,
                tenantItem: false
            });
        }

        // If user has permissions, insert menu item
        if (this.hasPermission(['admin-users-read'])) {
            list_items.push({
                name: 'Usuarios',
                routeOrFunction: '/app/users',
                icon: 'users.svg',
                position: 10,
                pathMatchExact: true,
                tenantItem: true
            });
        }

        // If user has permissions, insert menu item
        if (this.hasPermission(['admin-conciliaciones-read'])) {
            list_items.push({
                name: 'Conciliaciones',
                routeOrFunction: '/app/conciliaciones',
                icon: 'account_balance.svg',
                position: 10,
                pathMatchExact: true,
                tenantItem: true
            });
        }

        // If user has permissions, insert menu item
        if (this.hasPermission(['admin-catalogs-read'])) {
            list_items.push({
                name: 'Settings',
                routeOrFunction: '/app/settings',
                icon: 'config.svg',
                position: 15,
                pathMatchExact: true,
                tenantItem: true
            });
        }

        // Use service to render new menu items
        list_items.forEach(item => this.sidenavService.addItem(item));

    }

    // Validate if a permission or array of permissions are in current permissions variable
    hasPermission(perms: any): boolean {
        if (this.identity && this.identity.role == 'Admin')
            return true;

        // initialize context variable
        var to_validate: string[] = [];

        // If permission is string, convert to array
        if (typeof (perms) == 'string') {
            to_validate.push(perms);
        }

        // If permission is array, copy to local variable
        if (typeof (perms) == 'object') {
            to_validate = perms;
        }

        // Filter permissions slugs that are in stored in local
        let authorized = to_validate.filter((el) => {
            return (this.permissions_slugs.indexOf(el) > -1);
        });
        // return true if user has one or more permissions
        return (authorized && authorized.length > 0);
    }

    // Validate if user has permissions to a module, a component or activity based on the permissions tree
    validatePermissionTree(module: string, component?: string, activity?: string): boolean {
        if (this.identity.role == 'Admin')
            return true;
        // Validate if module permission exists
        if (this.permissions[module]) {
            // Validate if component validation is defined
            if (component) {
                //Validate if component permission exists
                if (this.permissions[module][component]) {
                    // Validate if activity validation is defined
                    if (activity) {
                        // Validate if activity permission exists
                        if (this.permissions[module][component].indexOf(activity) > -1) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return true;
                    }
                } else {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    /*********************
        DATA
    **********************/

    _requestOptions() {
        let headers = new HttpHeaders({ 'Authorization': this.getToken() });
        let requestOptions = { headers: headers };
        return requestOptions;
    }

    // Generate base data
    __construct_data() {
        this.build = true;
        // Get token from local storage
        this._initializeToken();

        // Get identity from local strorage
        this._initializeIdentity();

        // Get identity from local strorage
        this._initializeTenants();

    }

    // Load token from local storage and set up in a local variable
    _initializeToken() {
        let token = localStorage.getItem('token');
        if (token != undefined) {
            this.token = token;
        } else {
            this.token = null;
            this._autoLogout();
        }
    }

    // Load identity from local storage an set up in a local variable
    _initializeIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != undefined) {
            this.identity = identity;
        } else {
            this.identity = null;
            this._autoLogout();
        }
    }

    _initializeTenants() {
        let tenants = null;
        try {
            tenants = JSON.parse(localStorage.getItem('tenants'));
        } catch (err) {
            tenants = null;
        }
        if (tenants) {
            this.tenants = tenants;
        } else {
            this.tenants = null;
        }
    }

    // Set up identity on a local storage and set up in local variable
    setIdentity(user: any) {
        localStorage.setItem('identity', JSON.stringify(user));
        this._initializeIdentity();
    }

    // Set up tenants on a local storage and set up in local variable
    setTenants(tenants: any) {
        localStorage.setItem('tenants', JSON.stringify(tenants));
        this.tenants = tenants;
    }

    // Set up token on a local storage and setup in a local variable
    setToken(token: string) {
        localStorage.setItem('token', token);
        this._initializeToken();
    }

    // Set up tenants on a local storage and setup in a local variable

    selectTenant(tenant: any) {
        localStorage.setItem('tenant', JSON.stringify(tenant));
        this.setToken(tenant.token);
    }

    setLenguage() {
        if (!localStorage.getItem('lenguage'))
            localStorage.setItem('lenguage', 'es');
    }

    changeLenguage(lenguage: string): void {
        localStorage.setItem('lenguage', lenguage);
    }

    // Get current active tenant
    getTenant(): any {
        return JSON.parse(localStorage.getItem('tenant'));
    }

    getLenguage(): string {
        return localStorage.getItem('lenguage');
    }

    // Return identity from local variable
    getIdentity(): any {
        return this.identity;
    }

    // Return token from local variable
    getToken(): string {
        return this.token;
    }

    // Make a login request
    doLogin(userdata: any) {
        return this.http.post(`${environment.apiUrl}auth/login`, userdata);
    }

    // Validate current token if isn't expired
    validate_token(): Promise<boolean> {

        let headers = new HttpHeaders({ 'Authorization': this.getToken() });
        let requestOptions = { headers: headers };
        return new Promise(resolve => {
            this.http.get(`${environment.apiUrl}auth/validate-token`, requestOptions).subscribe(
                (data) => {
                    if (data['valid']) {
                        this.setIdentity(data['user']);
                        let adminTenants = data['tenants'].filter(tn => tn._role.permissions.includes('admin-stats-read'));
                        this.setTenants(adminTenants);
                        this.selectTenant(data['current_tenant'])
                        this.permissions_slugs = data['current_tenant']['_role']['permissions'];
                        this._makePermissionsTree();
                        resolve(true);
                    } else {
                        this.doLogout();
                        resolve(false);
                    }
                },
                (err) => {
                    resolve(false);
                });
        });
    }

    // Redirect to base page
    _autoLogout() {
        if (this.router.url !== '/') {
            this.router.navigate(['/']);
        }
    }

    // Validate if user is logged in
    validateLogged() {
        if (!this.identity || !this.identity._id || !this.token || this.token.length == 0) {
            this.doLogout();
        }
    }

    // Redirect if user is logged in
    redirectLogin() {
        if (this.identity && this.identity._id && this.tenants && this.tenants.length) {
            this.zone.run(() => {

                // If no tenant selected, and count of tenants is greter than 1
                if (!this.getTenant() && this.tenants.length > 1) {

                    this.router.navigate(['select-company']);
                    return;
                }
                // If no tenant selected, and count of tenants is eq than 1, select first one
                if (!this.getTenant() && this.tenants.length == 1) {
                    console.log(3)
                    this.selectTenant(this.tenants[0]);
                }

                this.router.navigate(['app/dashboard']);

            });
        }
    }

    
    // Send a password restore request from an email
    async requestPasswordRestore(email: string) {
        try {
            const response = await this.http
                .post(`${environment.apiUrl}auth/request-password-restore`, { email: email })
                .toPromise();
            return await response;
        } catch (err) {
            return await this.handleError(err);
        }
    }

    // Send a code received to restore password (step 2)
    async requestPasswordCodeValidate(code: string) {
        try {
            const response = await this.http
                .post(`${environment.apiUrl}auth/request-password-restore-code`, { code: code })
                .toPromise();
            return response;
        } catch (err) {
            return await this.handleError(err);
        }
    }

    // Send new password with previous token (step 3)
    async requestPasswordSetupNew(token: string, password: string) {
        try {
            const response = await this.http
                .post(`${environment.apiUrl}auth/request-password-setup-new`, { token: token, password: password })
                .toPromise();
            return response;
        } catch (err) {
            return await this.handleError(err);
        }
    }



    // Clear data and redirect
    doLogout() {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        // localStorage.removeItem('company');
        localStorage.removeItem('tenant');
        localStorage.clear();
        this.token = null;
        this.identity = null;
        this.permissions = [];
        this.permissions_slugs = [];
        this.build = false;
        this.tenants = null
        this.sidenavService.restoreItems();
        this.router.navigate(['login']);

    }

    // Global function to display a snack bar message
    displayMessage(msg: string) {
        this.snackBar.open(msg, 'Cerrar', {
            duration: 3000
        });
    }

    // Go history back
    goBack() {
        window.history.back();
    }

    // Handle error response
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error, JSON.stringify(error)); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}