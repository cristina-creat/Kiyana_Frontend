/** @class app/services/stats */

/**
 * @description Service to handle CRUD tenants
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

// Implements decorator Injectable to use as a service
@Injectable({
  providedIn: 'root'
})
// Exportable as a class
export class StatsService {

  // Use http service to connect to the backend
  constructor(
    private http: HttpClient
  ) { }

  // Get all global tenant stats (like number of users, number of conciliaciones)
  getGlobalStats(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}stats/global`);
  }

  // Get stats from some date until some date
  getPeriodStats(start: string, end: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}stats/period/${start}/${end}`);
  }


}
