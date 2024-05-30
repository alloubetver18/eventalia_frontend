import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

import { Auth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, RouterLink, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent implements OnInit{

  private auth = inject(Auth);

  myForm!: FormGroup;
  userForm!: FormGroup;

  constructor(private authservice: AuthService, private dialogRef: MatDialogRef<LoginComponent>, private router: Router, private fb: FormBuilder) {
    
  }

  ngOnInit(){
    this.userForm = this.fb.group({
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginInSystem(event: Event){
    try{
      event.preventDefault();
      let emailloginservice: string = "usuario@usuario.es";
      let passwordloginservice: string = "password";
      console.log("Email introducido: "+this.userForm.get('email')?.value);
      console.log("Password introducido: "+this.userForm.get('password')?.value);
      if(this.userForm.get('email')?.value.length>0){
        emailloginservice = this.userForm.get('email')?.value;
      }
      if(this.userForm.get('password')?.value.length>0){
        passwordloginservice = this.userForm.get('password')?.value;
      }
  
      this.authservice.login(emailloginservice, passwordloginservice).then(async ()=>{
        let currentUser = await this.authservice.getCurrentUser();
        //console.log(currentUser);
        if(currentUser==null){
          alert("Los datos de inicio de sesión introducidos no son válidos.");
        }else{
          this.dialogRef.close("success");
          //this.router.navigateByUrl('/home');
        }
      });
      //console.log(this.authservice.login(emailloginservice, passwordloginservice));
    }catch(error){
      console.log(error);
    }
    //Comprobar si el texto del primer formularis es uno concreto, y el de password otro
    
   
    
  }

  toRegister(event: Event){
    event.preventDefault();
    this.dialogRef.close(false);
  }

}
