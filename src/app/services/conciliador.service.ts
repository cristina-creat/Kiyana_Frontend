/** @class app/services/conciliador */

/**
 * @description Service to handle tenant conciliaciones
 * 
 */

// Require angular dependencies
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
// Require environment configuration
import { environment } from 'environments/environment';

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: "root",
})

// Exportable as a class
export class ConciliadorService {

  // Use http service to connect to the backend
  constructor(
    private http: HttpClient, 
  ) {}

  // Get all conciliaciones (filtered in backend)
  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}conciliador/`);
  }

  // Send new conciliacion request
  makeRequest(data:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}conciliador/`,data);
  }

  // Get last available results from a conciliación by its ID
  getResultsById( id: string ): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}conciliador/${id}`).pipe(map(data => convertAny(data)));
  }
  
  // Repeat the conciliacion proccess (match report with insurance)
  doConciliacion( id: string ): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}conciliador/${id}/sync`);
  }
  
  // Remove conciliacion (also rpas will be removed)
  removeRequest( id: string ): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}conciliador/${id}`);
  }
  
  // Reset an RPA to put it on the queue
  resetQueue( id_conciliacion: string, id_queue: string ): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}conciliador/${id_conciliacion}/reset-queue/${id_queue}`);
  }
  
  // Download all files from a conciliacion
  getResultsFileById( id: string, result_id: string, filename: string ): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiUrl}conciliador/${id}/file-download/${result_id}/${filename}`, { responseType: 'blob' as 'json' });
  }

}

// Common function to handle all requests, que info from "data" prop if exists
function convertAny( data:any ) {
  var data = (data.data) || data;
  return data;
}