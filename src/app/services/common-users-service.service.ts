import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonUsersServiceService {
  constructor(public afAuth: AngularFireAuth, private _http: HttpClient) {}

  getCommonUserByEmail(email: string): Observable<any> {
    return this._http.post('http://localhost:8000/user/common/getone', email);
  }
}
