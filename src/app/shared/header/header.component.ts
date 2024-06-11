import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from '../../components/modals/login/login.component';

import { JsonPipe, AsyncPipe } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { TipoUsuarioComponent } from '../../components/modals/tipo-usuario/tipo-usuario.component';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    RouterLink,
    MatMenuModule,
    JsonPipe,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [AuthService],
})
export class HeaderComponent implements OnInit, OnChanges {
  @Input() userData: Observable<any> = this.authService.afAuth.user;

  showFiller = false;
  public isLogged = false;

  user: any;
  public user$: Observable<any> = this.authService.afAuth.user;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  async ngOnInit(): Promise<any> {
    console.log('cargar la cabecera');
    this.user = await this.authService.getCurrentUser().then(() => {
      if (this.user) {
        console.log('user: ', this.user);
        this.isLogged = true;
      } else {
        console.log('no existe usuario logueado');
        this.isLogged = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ha habido cambios');
    if (changes['userData']) {
      console.log(this.userData);
    }
  }

  async logout() {
    try {
      await this.authService.logout().then(async () => {
        let currentUser = await this.authService.getCurrentUser();
        console.log(currentUser);
        if (currentUser == null) {
          alert('El usuario cerró sesión de forma exitosa.');
          localStorage.removeItem('email');
        } else {
          /* this.dialogRef.close("success"); */
          //this.router.navigateByUrl('/home');
        }
        this.router.navigate(['/home']);
      });
    } catch (error) {
      console.log(error);
    }
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result == 'success') {
        this.router.navigate(['/perfil']);
      } else if (result == 'register') {
        this.router.navigate(['/register']);
      }
    });
  }

  openDialogRegister(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    const dialogRef = this.dialog.open(TipoUsuarioComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/register']);
      }
    });
  }
}
