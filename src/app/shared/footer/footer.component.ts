import { Component } from '@angular/core';
import { LoginComponent } from '../../components/modals/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(public dialog: MatDialog, private router: Router){

  }

  iniciar_login(event: Event){
    event.preventDefault();
    this.openDialog('0', '0');
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/perfil']);
    });
  }
}
