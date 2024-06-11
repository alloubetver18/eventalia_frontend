import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersServiceService {
  constructor(private _http: HttpClient) {}

  getActiveUserRole(email: string): Observable<any> {
    return this._http.get('http://localhost:8000/user/getrol/' + email);
  }
}
