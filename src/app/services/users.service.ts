/** @class app/services/users */

/**
 * @description Service to handle CRUD users
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
export class UsersService {

  // Use http service to connect to the backend
  // Use login service to inject headers
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  
  // Get all users
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}users`, this.loginService._requestOptions());
  }

  // Create or update user (if user ID is present in the body)
  // Params (full user data)
  saveOrUpdate(user: User): Observable<any> {
    if (user._id)
      return this.http.patch(`${environment.apiUrl}users/${user._id}`, user, this.loginService._requestOptions());
    else
      return this.http.post(`${environment.apiUrl}users`, user, this.loginService._requestOptions());
  }
  
  // Update user password
  //
  // Params:
  // user: full user data with ID
  // password: new password
  updatePassword(user: User, pass: String): Observable<any> {
    return this.http.patch(`${environment.apiUrl}users/${user._id}/password`, {password: pass}, this.loginService._requestOptions());
  }

  // Get full user data by ID
  //
  // Params:
  // user_id: String user ID
  getUserById(user_id: String): Observable<any> {
    return this.http.get(`${environment.apiUrl}users/${user_id}`, this.loginService._requestOptions());
  }


  // Delete single user
  //
  // Params:
  // user: full user data with ID
  delete(user: User): Observable<any> {
    if (user._id)
      return this.http.delete(`${environment.apiUrl}users/${user._id}`, this.loginService._requestOptions());
  }

  // Insert tach users
  //
  // Params:
  // users: array of user data
  bulkUsers(users: User[]): Observable<any> {
    return this.http.post(`${environment.apiUrl}bulk-users`, { users: users }, this.loginService._requestOptions());
  }

 





}
