import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AuthService } from '../../services/auth.service';
import { CommonUsersServiceService } from '../../services/common-users-service.service';
import { eventInterfaceProfile } from '../../models/event.interface';

interface event {
  id: number;
  img: string;
  nombre: string;
  organizador: string;
  fecha_hora: string;
  ciudad: string;
}

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, RouterLink, NgxPaginationModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css',
  providers: [AuthService],
})
export class PerfilUsuarioComponent implements OnInit {
  p: number = 1;
  q: number = 1;
  r: number = 1;

  emaildeusuario: any;

  imageString: string = '';

  avatarImage: string = '';
  avatarFormatImage: string = '';

  nombre: string = '';
  apellidos: string = '';

  rol: number = 0;

  nick: string = '';

  themes: string = '';

  new_recommended_events: eventInterfaceProfile[] = [];

  recomended_events: event[] = [
    {
      id: 1,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Feria del Caballo Jerez 2024',
      organizador: 'Ayuntamiento de Jerez',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Jerez de la Frontera, Cádiz',
    },
    {
      id: 2,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Salón del Manga Chiclana 2024',
      organizador: 'Ayuntamiento de Chiclana de la Frontera',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la Frontera, Cádiz',
    },
    {
      id: 3,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 4,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
    {
      id: 5,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 6,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
    {
      id: 7,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 8,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
    {
      id: 9,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 10,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
  ];

  events_followed: event[] = [
    {
      id: 1,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Salón del Manga Chiclana 2024',
      organizador: 'Ayuntamiento de Chiclana de la Frontera',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la Frontera, Cádiz',
    },
    {
      id: 2,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 3,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
    {
      id: 4,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 5,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
    {
      id: 6,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 7,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
    {
      id: 8,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
    },
    {
      id: 9,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
    },
  ];

  events_created: event[] = [
    {
      id: 6,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Fiesta de Fin de Curso 2024',
      organizador: 'alban.loubet',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la Frontera, Cádiz',
    },
  ];

  userData: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private commonuserservice: CommonUsersServiceService
  ) {}

  async ngOnInit() {
    //alert("Aquí se obtendrán los datos del usuario a partir de las credenciales almacenadas en IndexedDB");
    alert(localStorage.getItem('email'));
    //let currentUser = await this.authService.getCurrentUser();
    console.log(localStorage.getItem('email'));

    if (localStorage.getItem('email') != null) {
      this.commonuserservice
        .getCommonUserByEmail(localStorage.getItem('email')!)
        .subscribe((response) => {
          console.log(response['result']);
          console.log(response['data']);
          console.log(response['data']['themes']);

          this.imageString =
            'data:image/' +
            response['data']['avatarimageformat'] +
            ';base64,' +
            response['data']['avatarimage'];

          this.nombre = response['data']['name'];
          this.apellidos = response['data']['surname'];
          this.rol = parseInt(response['data']['rol']);

          this.nick = response['data']['nick'];
          for (let i = 0; i < response['data']['themes'].length; i++) {
            if (i < response['data']['themes'].length - 1) {
              this.themes =
                this.themes +
                ' ' +
                response['data']['themes'][i]['name'] +
                ', ';
            } else {
              this.themes =
                this.themes + ' ' + response['data']['themes'][i]['name'] + '.';
            }

            //Cambiar la estructura del objeto para que se adecue a lo que me interesa

            //this.recomended_events = response['data'];
          }
          for (let j = 0; j < response['data']['eventssugested'].length; j++) {
            let event: eventInterfaceProfile = {
              id: response['data']['eventssugested'][j]['id'],
              city: response['data']['eventssugested'][j]['city'],
              created_by: response['data']['eventssugested'][j]['created_by'],
              date_when_finish:
                response['data']['eventssugested'][j]['date_when_finish'],
              date_when_started:
                response['data']['eventssugested'][j]['date_when_started'],
              image:
                'data:image/' +
                response['data']['eventssugested'][j]['imageformat'] +
                ';base64,' +
                response['data']['eventssugested'][j]['image'],
              imageformat: response['data']['eventssugested'][j]['imageformat'],
              name: response['data']['eventssugested'][j]['name'],
              province: response['data']['eventssugested'][j]['province'],
            };
            this.new_recommended_events.push(event);
          }
        });
    }

    /* this.emaildeusuario = currentUser?.email;
    if (currentUser == null) {
      console.log(
        'intentando entrar en el perfil sin estar logueado. redirigiendo a Home'
      );
      this.router.navigate(['/home']);
    } else {
        this.commonuserservice
          .getCommonUserByEmail(localStorage.getItem('email')!)
          .subscribe((response) => {
            console.log(response['result']);
          });
    } */
  }
}
