/** @class app/services/me */

/**
 * @description Service to handle personal user data
 * 
 */

// Require angular dependencies
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
// Require environment configuration
import { environment } from '../../environments/environment';
// Require login service
import { LoginService } from 'app/services/login.service';
// Require user model
import { User } from '../models/user.model';

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: 'root'
})
// Exportable as a class
export class MeService {
  // Use http service to connect to the backend
  // Use login service to inject headers
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  // Get current user information
  getMe(): Observable<any> {
    return this.http.get(`${environment.apiUrl}me/`, this.loginService._requestOptions());
  }

  // Update current user information
  //
  // Params
  // user: userdata to update (not updatable data will be filtered on backend)
  updateUser(user: User): Observable<any> {
    return this.http.patch(`${environment.apiUrl}me/`, user, this.loginService._requestOptions());  
  }



}
