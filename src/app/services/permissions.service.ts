/** @class app/services/permissions */

/**
 * @description Service to handle global permissions reading
 * 
 */

// Require angular dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
// Require environment configuration
import { environment } from 'environments/environment';
// Require login service
import { LoginService } from 'app/services/login.service';
// Require permissions model
import { Permission } from '../models/permission.model';

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: 'root'
})
// Exportable as a class
export class PermissionsService {
  // Use http service to connect to the backend
  // Use login service to inject headers
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  // Get all global permissions
  getAll(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${environment.apiUrl}permissions`, this.loginService._requestOptions());
  }
}
