import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TipoUsuarioComponent } from '../../components/modals/tipo-usuario/tipo-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {JsonPipe, AsyncPipe} from "@angular/common";

interface event{
  id: number,
  img: string,
  nombre: string,
  organizador: string,
  fecha_hora: string,
  ciudad: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [AuthService]
})

export class HomeComponent implements OnInit{

  list_events: event[] = [
    {
      id: 1,
      img: '../../../assets/img/salon-manga-chiclana-redux2.jpg',
      nombre: 'Feria del Caballo Jerez 2024',
      organizador: 'Ayuntamiento de Jerez',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Jerez de la Frontera, Cádiz'
    },
    {
      id: 2,
      img: '../../../assets/img/salon-manga-chiclana-redux.jpg',
      nombre: 'Salón del Manga Chiclana 2024',
      organizador: 'Ayuntamiento de Chiclana de la Frontera',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la Frontera, Cádiz'
    },
    {
      id: 3,
      img: '../../../assets/img/salon-manga-chiclana-redux.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz'
    },
    {
      id: 4,
      img: '../../../assets/img/salon-manga-chiclana-redux.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz'
    }
  ];

  user: any;
  public user$: Observable<any> = this.authService.afAuth.user;
  constructor(public authService: AuthService, public dialog: MatDialog, private router: Router){

  }
  async ngOnInit() {
    this.user = await this.authService.getCurrentUser().then(()=>{
      /* if(this.user){
        console.log("user: ", this.user);
        this.isLogged=true;
      }else{
        console.log("no existe usuario logueado");
        this.isLogged=false;
      } */
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(TipoUsuarioComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
