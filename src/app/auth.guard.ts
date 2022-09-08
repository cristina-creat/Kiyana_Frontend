/** @module app/auth.guard */

/**
 * @description Authorization guard for routing, this guard prevent for unauthorized access
 * 
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';

// Define decorator
@Injectable()
export class AuthGuard implements CanActivate {

  // Use global login service
  // Use global router service
  constructor(
    public loginService: LoginService,
    private router: Router

  ) { }

  // Define main function for current guard, return a promise to validate userdata availability
  async canActivate(): Promise<boolean> {
    // If no user, redirect to login page and return false to prevent load content
    if (!this.loginService.identity || !this.loginService.identity._id && this.loginService.token && this.loginService.token.length > 0) {
      this.router.navigate(['']);
      return false;
    } else {
      // If user stored, validate userdata and wait for response
      await this.loginService.validate_token();
      // If user dont't have at least access to read stats, redirect to login page and return false to prevent load content
      if (!this.loginService.hasPermission('admin-stats-read')) {
        this.router.navigate(['']);
        return false;
      }
      // In this case, user have neccessary permissions, return true to authorize access
      return true;
    }
  }
}