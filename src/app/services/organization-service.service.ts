import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationServiceService {
  constructor(private _http: HttpClient) {}

  getOrganizationById(id: number): Observable<any> {
    return this._http.get('http://localhost:8000/user/organizations/' + id);
  }
}
