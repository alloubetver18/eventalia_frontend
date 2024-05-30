import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { User } from '@angular/fire/auth';
import { first } from 'rxjs/operators';
//import {auth} from 'firebase/compat';

@Injectable()
export class AuthService {
  public user: User | undefined;
  
  
  constructor(public afAuth: AngularFireAuth) { }

  async login(email: string, password: string): Promise<any>{
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        /* var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert("Los datos de inicio de sesión son erroneos.");
        } */
        console.log(error);
      });

      return result;
    }catch(error){
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  
  async register(email: string, password: string): Promise<any>{
    try{
      const result:any = await this.afAuth.createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
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
    }catch(error){
      console.log(error);
    }
  }

  async logout(){
    try{
      await this.afAuth.signOut();
    }catch(error){
      console.log(error);
    }
    
  }
  

  /* async fbIsUserVerified(): Promise<any>{
    // return (await this.#afAuth.currentUser)?.emailVerified;
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.emailVerified);
        } else {
          resolve(false);
        }
      }, error => reject(error));
    });
  }

  async fbUserEmail(): Promise<any>{
    // return (await this.#afAuth.currentUser)?.email;
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.email);
        } else {
          resolve(null);
        }
      }, error => reject(error));
    });
  } */

  
}
