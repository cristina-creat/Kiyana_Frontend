/** @class app/services/auth-interceptor */

/**
 * @description Service to intercept all requests
 * 
 */

// Require angular dependencies
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
// Require login service
import { LoginService } from 'app/services/login.service';

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: 'root'
})
// Exportable as a class
export class AuthInterceptorService implements HttpInterceptor {

  // Use login service to inject headers
  constructor(
    private loginService: LoginService
  ) { }

  // Intercept function, add neccessary headers
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Local var to store current request
    let request = req;

    // Local var to store tenant ID (if available)
    const tenant: string = this.loginService.getTenant();

    // If tenant ID exists, add it as a custom header
    if (tenant) {
      request = request.clone({
        setHeaders: {
          'Custom-Tenant': tenant
        }
      });
    }

    // Local var to store current user token
    let token = this.loginService.getToken();

    // If token exists, add it as a Auth header
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': token
        }
      });
    }

    // Pass control to next handler
    return next.handle(request);

  }

}
