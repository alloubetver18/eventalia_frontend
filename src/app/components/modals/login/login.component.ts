import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, RouterLink, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {

  private auth = inject(Auth);

  myForm: FormGroup;

  
  
  constructor(private authservice: AuthService, private dialogRef: MatDialogRef<LoginComponent>, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', ],
      password: ['',]
    });
  }

  loginInSystem(event: Event){
    //Comprobar si el texto del primer formularis es uno concreto, y el de password otro
    let emailloginservice: string = "usuario@usuario.es";
    let passwordloginservice: string = "password";
    if(this.myForm.get('email')?.value.length>0){
      emailloginservice = this.myForm.get('email')?.value;
    }
    if(this.myForm.get('password')?.value.length>0){
      passwordloginservice = this.myForm.get('password')?.value;
    }

    this.authservice.login(emailloginservice, passwordloginservice);
    //this.dialogRef.close(true);
  }

  toRegister(event: Event){
    event.preventDefault();
    this.dialogRef.close(false);
  }

}
