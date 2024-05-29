import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from '../../components/modals/login/login.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { TipoUsuarioComponent } from '../../components/modals/tipo-usuario/tipo-usuario.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,RouterLink, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [AuthService]
})
export class HeaderComponent implements OnInit{
  showFiller = false;
  public isLogged = false;
  user: any;

  constructor(private authService: AuthService, public dialog: MatDialog, private router: Router){

  }
  async ngOnInit(): Promise<any> {
    this.user = await this.authService.getCurrentUser();
    if(this.user){
      console.log("user: ", this.user);
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result){
        this.router.navigate(['/perfil']);
      }else{
        this.router.navigate(['/register']);
      }
      
    });
  }

  openDialogRegister(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(TipoUsuarioComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/register']);
      }
      
    });
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

}
