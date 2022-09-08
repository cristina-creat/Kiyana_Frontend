/** @class app/services/roles */

/**
 * @description Service to handle CRUD tenant roles
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
// Require role model
import { Role } from '../models/role.model';

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: 'root'
})
// Exportable as a class
export class RolesService {

  // Use http service to connect to the backend
  // Use login service to inject headers
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  // Get all tenant roles
  getAll(tenant_id: string, ): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.apiUrl}tenants/${tenant_id}/roles`, this.loginService._requestOptions());
  }

  // Create or update tenant roles (if role ID is present in the body)
  // Params:
  // tenant_id: String
  // role: (full tenant role data)
  saveOrUpdate(tenant_id: string, role: Role): Observable<any> {
    if (role._id)
      return this.http.patch(`${environment.apiUrl}tenants/${tenant_id}/roles/${role._id}`, role, this.loginService._requestOptions());
    else
      return this.http.post(`${environment.apiUrl}tenants/${tenant_id}/roles`, role, this.loginService._requestOptions());
  }

  // Delete single role
  //
  // Params:
  // tenant_id: ID String
  // role: full role data with ID
  delete(tenant_id: string, role: Role): Observable<any> {
    if (role._id)
      return this.http.delete(`${environment.apiUrl}tenants/${tenant_id}/roles/${role._id}`, this.loginService._requestOptions());
  }
}
