/** @class app/services/tenant */

/**
 * @description Service to handle CRUD tenants
 * 
 */

// Require angular dependencies
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';
// Require environment configuration
import { environment } from '../../environments/environment';
// Require login service
import { LoginService } from './login.service';
// Require tenant model
import { Tenant } from '../models/tenant.model';

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: 'root'
})

// Exportable as a class
export class TenanService {

  // Use http service to connect to the backend
  // Use login service to inject headers
  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  // Get all tenants
  getAll(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(`${environment.apiUrl}tenants`, this.loginService._requestOptions()).pipe(map(data => convertAny(data)));
  }

  // Create or update tenant (if tenant ID is present in the body)
  // Params (full tenant data)
  saveOrUpdate(tenant: Tenant): Observable<any> {
    if (tenant._id)
      return this.http.patch(`${environment.apiUrl}tenants/${tenant._id}`, tenant, this.loginService._requestOptions()).pipe(map(data => convertAny(data)));
    else
      return this.http.post(`${environment.apiUrl}tenants`, tenant, this.loginService._requestOptions()).pipe(map(data => convertAny(data)));
  }

  // Get full tenant data by ID
  //
  // Params:
  // tenant_id: String tenant ID
  getTenantById(tenant_id: String): Observable<any> {
    return this.http.get(`${environment.apiUrl}tenants/${tenant_id}`, this.loginService._requestOptions()).pipe(map(data => convertAny(data)));
  }

  // Delete tenant by ID
  //
  // Params:
  // tenant (Full tenant daba with ID)
  deleteTenantById(tenant: Tenant): Observable<any> {
    if (tenant._id)
      return this.http.delete(`${environment.apiUrl}tenants/${tenant._id}`, this.loginService._requestOptions()).pipe(map(data => convertAny(data)));
  }

  
  // Update tenant avatar by ID
  //
  // Params:
  // tenand_id: ID of tenant to be updated
  // avatar: HTML file object to be uploaded (jpg, png)
  addAvatar(tenant_id: String, avatar: File): Observable<any> {
    // This request will be sent through formData
    var formData = new FormData();
    formData.append("avatar", avatar);
    return this.http.patch(`${environment.apiUrl}tenants/${tenant_id}/avatar`, formData, this.loginService._requestOptions()).pipe(map(data => convertAny(data)));

  }

}

// Common function to handle all requests, que info from "data" prop if exists
function convertAny(data: any) {
  var data = (data.data) || data;
  return data;
}