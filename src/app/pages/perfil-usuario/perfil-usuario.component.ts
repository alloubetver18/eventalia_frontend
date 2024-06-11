import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { AuthService } from '../../services/auth.service';
import { CommonUsersServiceService } from '../../services/common-users-service.service';
import { eventInterfaceProfile } from '../../models/event.interface';
import { delay } from 'rxjs';

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

  new_followed_events: eventInterfaceProfile[] = [];

  new_events_created: eventInterfaceProfile[] = [];

  today = new Date();

  userData: any;

  constructor(
    public authService: AuthService,
    private router: Router,
    private commonuserservice: CommonUsersServiceService
  ) {
    if (localStorage.getItem('email') != null) {
      this.commonuserservice
        .getCommonUserByEmail(localStorage.getItem('email')!)
        .pipe(delay(2000))
        .subscribe((response) => {
          console.log(response['data']);
          this.imageString =
            'data:image/' +
            response['data']['avatarimageformat'] +
            ';base64,' +
            response['data']['avatarimage'];
          this.nombre = response['data']['name'];
          this.apellidos = response['data']['surname'];
          this.rol = parseInt(response['data']['rol']);
          this.nick = response['data']['nick'];

          if (this.rol == 2) {
            if (response['data']['eventscreated'].length > 0) {
              for (
                let k = 0;
                k < response['data']['eventscreated'].length;
                k++
              ) {
                let new_event: eventInterfaceProfile = {
                  id: response['data']['eventscreated'][k]['id'],
                  city: response['data']['eventscreated'][k]['city'],
                  created_by:
                    response['data']['eventscreated'][k]['created_by'],
                  date_when_finish:
                    response['data']['eventscreated'][k]['date_when_finish'],
                  date_when_started:
                    response['data']['eventscreated'][k]['date_when_started'],
                  image:
                    'data:image/' +
                    response['data']['eventscreated'][k]['imageformat'] +
                    ';base64,' +
                    response['data']['eventscreated'][k]['image'],
                  imageformat:
                    response['data']['eventscreated'][k]['imageformat'],
                  name: response['data']['eventscreated'][k]['name'],
                  province: response['data']['eventscreated'][k]['province'],
                  /* eventhappened:
                    response['data']['eventscreated'][k]['eventhappened'], */
                };
                this.new_events_created.push(new_event);
              }
            }
          }

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
              /* eventhappened:
                response['data']['eventscreated'][j]['eventhappened'], */
            };
            this.new_recommended_events.push(event);
          }

          for (
            let j = 0;
            j < response['data']['eventsinterested'].length;
            j++
          ) {
            let event: eventInterfaceProfile = {
              id: response['data']['eventsinterested'][j]['id'],
              city: response['data']['eventsinterested'][j]['city'],
              created_by: response['data']['eventsinterested'][j]['created_by'],
              date_when_finish:
                response['data']['eventsinterested'][j]['date_when_finish'],
              date_when_started:
                response['data']['eventsinterested'][j]['date_when_started'],
              image:
                'data:image/' +
                response['data']['eventsinterested'][j]['imageformat'] +
                ';base64,' +
                response['data']['eventsinterested'][j]['image'],
              imageformat:
                response['data']['eventsinterested'][j]['imageformat'],
              name: response['data']['eventsinterested'][j]['name'],
              province: response['data']['eventsinterested'][j]['province'],
              /* eventhappened:
                response['data']['eventscreated'][j]['eventhappened'], */
            };
            this.new_followed_events.push(event);
          }
        });
    } else {
      console.log(
        'intentando entrar en el perfil sin estar logueado. redirigiendo a Home'
      );
      this.router.navigate(['/home']);
    }
  }

  async ngOnInit() {
    //alert("Aquí se obtendrán los datos del usuario a partir de las credenciales almacenadas en IndexedDB");
    //alert(localStorage.getItem('email'));
    //let currentUser = await this.authService.getCurrentUser();
    /* console.log(localStorage.getItem('email')); */
  }
}
