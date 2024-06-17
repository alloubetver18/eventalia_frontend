import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
/* import { NgxMapboxGLModule } from 'ngx-mapbox-gl'; */
import * as mapboxgl from 'mapbox-gl';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonUsersServiceService } from '../../services/common-users-service.service';
import { delay } from 'rxjs';
import { environment } from '../../../environments/environment';

import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule
import { EventsServiceService } from '../../services/events-service.service';
import { UsersServiceService } from '../../services/users-service.service';

export interface EventData {
  id: number;
  Name: string;
  CreatedBy: string | null;
  Description: string;
  themes: string;
  eventImage: string | null;
  eventImageFormat: string;
  Place: Lugar;
  from: Date;
  to: Date;
  hour: string;
  price: number;
}

export interface Lugar {
  id: number;
  name: string;
  address: string;
  lonlat: string;
  localidad: string;
  provincia: string;
}

@Component({
  selector: 'app-add-evento',
  standalone: true,
  imports: [
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-evento.component.html',
  styleUrl: './add-evento.component.css',
})
export class AddEventoComponent implements OnInit {
  @ViewChild('findImage') findImage!: ElementRef;

  @ViewChild('locationInput') locationInput!: ElementRef;

  title = 'imagenes';
  nuevaImagen: string = '';
  imagenCargada: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(environment.IMG_STRING);

  base64Image: string | null = null;

  map!: mapboxgl.Map;

  myForm!: FormGroup;

  imagendividida: string[] = [];

  imageFormat: string = 'png';

  rol: number = 0;

  posicion: string = '36.420103,-6.148869';

  positionSearched: boolean = false;

  themesSelected: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  accessTokenMapBox: string =
    'pk.eyJ1IjoiYWxsb3ViZXR2ZXIxODEyIiwiYSI6ImNsY3RhZ2o5dTBqMHAzb3MxeHZzZ3lyanEifQ.2Jw1OyBFbyNkNAubvzRJeA';

  themesList: number[] = [];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder,
    private commonuserservice: CommonUsersServiceService,
    private eventService: EventsServiceService,
    private userService: UsersServiceService
  ) {}

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiYWxsb3ViZXR2ZXIxODEyIiwiYSI6ImNsY3RhZ2o5dTBqMHAzb3MxeHZzZ3lyanEifQ.2Jw1OyBFbyNkNAubvzRJeA',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-6.148869, 36.420103], // longitud, latitud
      zoom: 10, // zoom inicial
    });
    const mark = new mapboxgl.Marker()
      .setLngLat([36.420103, -6.148869])
      .addTo(this.map);

    this.myForm = this.fb.group({
      // Define tus controles de formulario y validaciones aquí
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(500),
        ],
      ],
      placename: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      placeaddress: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      placecity: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      placeprovince: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(30),
        ],
      ],
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required],
      startsAt: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
        ],
      ],
      priceEvent: ['', [Validators.required, Validators.maxLength(6)]],
      location: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(80),
        ],
      ],
      // Agrega más controles según sea necesario
    });

    if (localStorage.getItem('email') != null) {
      this.commonuserservice
        .getCommonUserByEmail(localStorage.getItem('email')!)
        .pipe(delay(1000))
        .subscribe((response) => {
          console.log(response['result']);

          this.rol = parseInt(response['data']['rol']);

          if (this.rol != 2) {
            this.router.navigate(['/home']);
          }
          //Cambiar la estructura del objeto para que se adecue a lo que me interesa

          //this.recomended_events = response['data'];
        });

      console.log('Formulario válido: ' + this.myForm.invalid);
    } else {
      this.router.navigate(['/home']);
    }
  }

  searchLocation(event: Event) {
    event.preventDefault();
    var location = this.locationInput.nativeElement.value;
    if (location.length == 0) {
      alert(
        'Introduce la dirección de un lugar, su nombre o unas coordenadas.'
      );
    } else {
      // Realizar una solicitud a la API de Mapbox Geocoding
      fetch(
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
          encodeURIComponent(location) +
          '.json?access_token=' +
          this.accessTokenMapBox
      )
        .then((response) => response.json())
        .then((data) => {
          // Obtener las coordenadas del primer resultado
          var coordinates = data.features[0].center;
          var arraycoordinates = coordinates.toString().split(',');

          this.posicion = arraycoordinates[1] + ',' + arraycoordinates[0];

          // Centrar el mapa en las coordenadas encontradas
          this.map.setCenter(coordinates);
          this.map.setZoom(15);

          // Agregar un marcador en el lugar encontrado
          new mapboxgl.Marker().setLngLat(coordinates).addTo(this.map);
          this.positionSearched = true;
        });
    }
  }

  selectTheme(event: MatCheckboxChange) {
    console.log(event.source.value);
    const isChecked = event.checked;
    if (isChecked) {
      this.themesList.push(parseInt(event.source.value));
    } else {
      this.themesList = this.themesList.filter(
        (num) => num !== parseInt(event.source.value)
      );
    }
    console.log('Checkbox is checked:', isChecked);
    console.log(this.themesList);
  }

  cargarImagen() {
    if (this.base64Image == null) {
      alert('No hay imagen cargada en memoria.');
    } else {
      this.imagenCargada = this.sanitizer.bypassSecurityTrustResourceUrl(
        this.base64Image
      );
    }
  }

  buscarImagen(event: Event) {
    event.preventDefault();
    this.findImage.nativeElement.click();
  }

  handleImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    if (file != undefined) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const image = new Image();
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          const format = file.type.split('/')[1];
          this.imageFormat = format;
          console.log(
            `Formato: ${format}, Ancho: ${width}px, Alto: ${height}px`
          );
          console.log(
            'Longitud de la cadena: ' + (fileReader.result as string).length
          );
          if (
            (format === 'jpeg' || format === 'png') &&
            width <= 600 &&
            height <= 2048
          ) {
            this.base64Image = fileReader.result as string;
            this.imagenCargada = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.base64Image
            );
            console.log(this.base64Image);
            this.imagendividida = this.base64Image.split('base64,');
            console.log('Longitud de la cadena: ' + this.base64Image.length);
            console.log(
              'tamaño del archivo: ' +
                this.base64Image.length / 1.37 / 1024 +
                ' kb'
            );
          } else if (format !== 'jpeg' && format !== 'png') {
            alert('El archivo seleccionado no es una imagen jpg o png');
          } else if (width > 600 || height > 2048) {
            alert('Las dimensiones de la imagen son mayores a 600px de ancho');
          }
        };
        image.onerror = () => {
          alert(
            'El archivo seleccionado no es un archivo de imagen válido. Por favor, seleccione una imagen jpg o png'
          );
        };
        image.src = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }

  registrarEvento(evento: Event) {
    const inputActivado = evento.target as HTMLInputElement;

    evento.preventDefault();
    console.log(this.myForm.get('name')?.value);
    console.log(new Date(this.myForm.get('dateFrom')?.value));
    console.log(new Date(this.myForm.get('dateTo')?.value));
    if (this.imagendividida.length == 0) {
      alert('Necesitas añadir una imagen a tu evento.');
    } else if (this.themesList.length == 0) {
      alert('Seleccione al menos un género');
    } else if (
      new Date(this.myForm.get('dateTo')?.value) <
      new Date(this.myForm.get('dateFrom')?.value)
    ) {
      alert('La fecha de inicio es posterior a la fecha de final.');
    } else if (
      new Date() > new Date(this.myForm.get('dateTo')?.value) ||
      new Date() > new Date(this.myForm.get('dateFrom')?.value)
    ) {
      alert(
        'No puedes crear un evento cuya fecha de inicio o de término ya ha pasado'
      );
    } else if (!this.positionSearched) {
      alert('Busca una ubicación en el mapa para saber a dónde ir.');
    } else {
      let newPlace: Lugar = {
        id: 0,
        name: this.myForm.get('placename')?.value,
        address: this.myForm.get('placeaddress')?.value,
        lonlat: this.posicion,
        localidad: this.myForm.get('placecity')?.value,
        provincia: this.myForm.get('placeprovince')?.value,
      };

      let fechaFrom = new Date(this.myForm.get('dateFrom')?.value);
      // Sumar un día
      fechaFrom.setDate(fechaFrom.getDate() + 1);

      let fechaTo = new Date(this.myForm.get('dateTo')?.value);

      fechaTo.setDate(fechaTo.getDate() + 1);

      let newEvent: EventData = {
        id: 0,
        Name: this.myForm.get('name')?.value,
        CreatedBy: localStorage.getItem('email'),
        Description: this.myForm.get('description')?.value,
        themes: this.themesList.toString(), //Arreglar esto
        eventImage: this.imagendividida[1], //Terminar
        eventImageFormat: this.imageFormat,
        Place: newPlace,
        from: fechaFrom,
        to: fechaTo,
        hour: this.myForm.get('startsAt')?.value,
        price: parseFloat(this.myForm.get('priceEvent')?.value),
      };

      console.log(JSON.stringify(newEvent));
      this.eventService.createEvent(newEvent).subscribe((result) => {
        console.log(result);
        alert('Evento creado correctamente.');
        this.router.navigate(['/perfil']);
      });
    }
  }

  iraEventos(event: Event) {
    event.preventDefault();
    this.router.navigate(['/listaeventos']);
  }
}
