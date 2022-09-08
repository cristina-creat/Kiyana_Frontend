
/** @module app/logout.guard */

/**
 * @description Authorization guard for routing, this guard redirect from login page to dashboard page, to prevent user login again once is logged in
 * 
 */import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';

// Define decorator
@Injectable()
export class LogoutGuard implements CanActivate {

  // Use global login service
  // Use global router service
  constructor(
    public loginService: LoginService,
    private router: Router

  ) { }

  // Define main function for current guard, return a promise to validate userdata availability
  async canActivate( ): Promise<boolean>{
    // If no userdata, let user open route
    if(!this.loginService.identity || !this.loginService.identity._id && this.loginService.token && this.loginService.token.length > 0){
        return true;
    } else {
        // If already userdata, validate is still valid, should return to dashboard page
        await this.loginService.validate_token();
        // If user don't have permissions, redirect to login page
        if ( !this.loginService.hasPermission('admin-stats-read') ) {
          this.router.navigate(['']);
          return true;
        }
        // If user still have permissions, redirect to dashboard and allow permissions
        this.router.navigate(['/app']);
        return true;
    }
  }

}
