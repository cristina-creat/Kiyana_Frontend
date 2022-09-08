/** @class app/services/catalogs */

/**
 * @description Service to handle tenant catalogs
 * 
 */

// Require angular dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Require environment configuration
import { environment } from 'environments/environment';
// Require login service
import { LoginService } from 'app/services/login.service'

// Implements decorator Injectable to use as a service
@Injectable()
// Exportable as a class
export class CatalogService {

    // Use http service to connect to the backend
    // Use login service to inject headers
    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ) { }

    // Get all items from a catalog name (neccessary filtrations will be made on backend)
    getAll(name: string): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}catalog/${name}?all=true`, this.loginService._requestOptions()).pipe(map(data => convertAny(data)));;
    }

    // Create or update an item by a catalog name(if item ID is present)
    saveOrUpdate(name: string, item: any): Observable<any> {
        if (item._id) {
            return this.http.patch<any>(`${environment.apiUrl}catalog/${name}/${item._id}`, item, this.loginService._requestOptions());
        }
        else {
            return this.http.post<any>(`${environment.apiUrl}catalog/${name}`, item, this.loginService._requestOptions());
        }
    }

    // Remove an item from the catalog name and ID
    delete(name: string, id: string): Observable<any> {
        return <any>this.http.delete(`${environment.apiUrl}catalog/${name}/${id}`, this.loginService._requestOptions());
    }

    // Upload file and generate a public URL
    uploadFile(file: File): Observable<any> {
        var formData = new FormData();
        formData.append("file", file);
        return this.http.post(`${environment.apiUrl}catalog/upload-file`, formData, this.loginService._requestOptions());
    }


}

// Common function to handle all requests, que info from "data" prop if exists
function convertAny(data: any) {
    var data = (data.data) || data;
    return data;
}

