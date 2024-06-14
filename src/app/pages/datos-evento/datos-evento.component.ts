import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ModalLugarComponent } from '../../components/modals/modal-lugar/modal-lugar.component';
import { MatInputModule } from '@angular/material/input';
import { EventsServiceService } from '../../services/events-service.service';
import { Result } from '../../../../../../Angula-Curso-2/03-pokeapp/src/app/poke/interfaces/pokeList.interface';
import { CommonUsersServiceService } from '../../services/common-users-service.service';
import { delay } from 'rxjs';

interface genero {
  id: number;
  denominacion: string;
}

interface evento {
  id: number;
  img: string;
  nombre: string;
  id_organizador: number;
  organizador: string;
  fecha: string;
  fecha_fin: string;
  hora: string;
  lugar: string;
  direccion: string;
  ciudad: string;
  descripcion: string;
  generos: genero[];
  latlon: string;
}

@Component({
  selector: 'app-datos-evento',
  standalone: true,
  imports: [RouterLink, MatInputModule],
  templateUrl: './datos-evento.component.html',
  styleUrl: './datos-evento.component.css',
})
export class DatosEventoComponent {
  eventoSeleccionado: evento = {
    id: 0,
    img: '',
    nombre: '',
    id_organizador: 0,
    organizador: '',
    fecha: '',
    fecha_fin: '',
    hora: '',
    lugar: '',
    direccion: '',
    ciudad: '',
    descripcion: '',
    generos: [],
    latlon: '',
  };

  id: any;

  rol: number = 0;

  participatingInEvent = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private eventService: EventsServiceService,
    private commonuserservice: CommonUsersServiceService
  ) {
    /* console.log(this.activatedRoute); */
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'] || null;
      if (this.id == null) {
        this.router.navigate(['/home']);
      }
      this.commonuserservice
        .getCommonUserByEmail(localStorage.getItem('email')!)
        .pipe(delay(1000))
        .subscribe((response) => {
          console.log('Resultado de buscar usuario: ' + response['result']);

          this.rol = parseInt(response['data']['rol']);

          console.log('Valor del Rol: ' + this.rol);

          //console.log(this.rol);
          //Cambiar la estructura del objeto para que se adecue a lo que me interesa

          //this.recomended_events = response['data'];
        });
      this.eventService
        .getEventById(this.id, localStorage.getItem('email')!)
        .subscribe((result) => {
          console.log(result);
          if (result['result'] != 'failure') {
            this.eventoSeleccionado.id = this.id;
            this.eventoSeleccionado.id_organizador =
              result['data']['id_organizador'];
            this.eventoSeleccionado.nombre = result['data']['nombre'];
            this.eventoSeleccionado.organizador = result['data']['organizador'];
            this.eventoSeleccionado.fecha = this.convertirFecha(
              result['data']['fecha_inicio']
            );
            this.eventoSeleccionado.fecha_fin = this.convertirFecha(
              result['data']['fecha_fin']
            );
            this.eventoSeleccionado.hora = result['data']['hora_inicio'];
            this.eventoSeleccionado.lugar = result['data']['lugar'];
            this.eventoSeleccionado.latlon =
              result['data']['latitud'] + ',' + result['data']['longitud'];
            this.eventoSeleccionado.direccion = result['data']['direccion'];
            this.eventoSeleccionado.ciudad = result['data']['ciudad'];
            this.eventoSeleccionado.descripcion = result['data']['descripcion'];
            this.eventoSeleccionado.generos = result['data']['generos'];
            this.eventoSeleccionado.img =
              'data:image/' +
              result['data']['imageformat'] +
              ';base64,' +
              result['data']['image'];
            this.participatingInEvent = result['data']['participating'];
            console.log(result['data']);
          } else {
            this.router.navigate(['/home']);
          }
        });
    });
  }

  modalLugar(event: Event) {
    event.preventDefault();
    this.openDialogmodalLugar('0', '0');
  }

  openDialogmodalLugar(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(ModalLugarComponent, {
      width: '500px',
      height: '600px',
      data: this.eventoSeleccionado.latlon,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  convertirFecha(fecha: string): string {
    // Dividir la cadena en partes
    const [year, month, day] = fecha.split('-');

    // Formatear la nueva cadena
    const nuevaFecha = `${day}/${month}/${year}`;

    return nuevaFecha;
  }

  seguir() {
    let email = localStorage.getItem('email')!;
    let eventId = this.id;

    this.eventService.followEvent(email, eventId).subscribe((result) => {
      console.log(result);
      alert('Seguimiento modificado correctamente.');
      this.router.navigate(['/perfil']);
    });
  }
}
