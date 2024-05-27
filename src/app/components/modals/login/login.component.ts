import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, RouterLink, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private dialogRef: MatDialogRef<LoginComponent>, private router: Router) { }

  loginInSystem(){
    //Comprobar si el texto del primer formularis es uno concreto, y el de password otro
    this.dialogRef.close(true);
  }

  toRegister(event: Event){
    event.preventDefault();
    this.dialogRef.close(false);
  }

}
