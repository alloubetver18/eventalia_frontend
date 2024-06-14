import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TipoUsuarioComponent } from '../../components/modals/tipo-usuario/tipo-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { JsonPipe, AsyncPipe } from '@angular/common';
import { EventsServiceService } from '../../services/events-service.service';

interface event {
  id: number;
  img: string;
  nombre: string;
  organizador: string;
  fecha_hora: string;
  ciudad: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatCardModule, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [AuthService],
})
export class HomeComponent implements OnInit {
  event_counter = 0;
  list_events: event[] = [];

  user: any;
  public user$: Observable<any> = this.authService.afAuth.user;
  constructor(
    public authService: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private eventservice: EventsServiceService
  ) {
    this.eventservice.getEventList().subscribe((result) => {
      for (let i = result['data'].length - 1; i > -1; i--) {
        if (this.event_counter < 4) {
          let nuevoEvento: event = {
            id: result['data'][i]['event_id'],
            img:
              'data:image/' +
              result['data'][i]['imageformat'] +
              ';base64,' +
              result['data'][i]['imagen'],
            nombre: result['data'][i]['nombre'],
            organizador: result['data'][i]['organizador'],
            fecha_hora:
              result['data'][i]['fecha_inicio'] +
              ', ' +
              result['data'][i]['hora_inicio'],
            ciudad:
              result['data'][i]['ciudad'] +
              ', ' +
              result['data'][i]['provincia'],
          };
          this.list_events.push(nuevoEvento);
          this.event_counter++;
        }
      }
    });
  }
  async ngOnInit() {
    this.user = await this.authService.getCurrentUser().then(() => {
      /* if(this.user){
        console.log("user: ", this.user);
        this.isLogged=true;
      }else{
        console.log("no existe usuario logueado");
        this.isLogged=false;
      } */
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(TipoUsuarioComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
