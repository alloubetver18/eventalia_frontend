import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
import { commonUserInterface } from '../models/commonuser.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrganizationInterface } from '../models/organization.interface';
//import {auth} from 'firebase/compat';

@Injectable()
export class AuthService {
  public user: User | undefined;

  constructor(public afAuth: AngularFireAuth, private _http: HttpClient) {}

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password)
        .catch(function (error) {
          // Handle Errors here.
          console.log(error);
        });

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const result: any = await this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == 'auth/email-already-in-use') {
            alert('The email is already in use.');
          } else {
            alert(errorMessage);
          }
          console.log(error);

          return result;
        });
    } catch (error) {
      console.log(error);
    }
  }

  registerAPI(cui: commonUserInterface): Observable<any> {
    return this._http.post('http://localhost:8000/user/common/add', cui);
  }

  registerOrganizationAPI(cui: OrganizationInterface): Observable<any> {
    return this._http.post('http://localhost:8000/user/organizations/add', cui);
  }

  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
}
