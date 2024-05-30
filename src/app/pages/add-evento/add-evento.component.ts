import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
/* import { NgxMapboxGLModule } from 'ngx-mapbox-gl'; */
import * as mapboxgl from 'mapbox-gl';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface EventData {
  id: number;
  Name: string;
  Description: string;
  themes: number[];
  avatarImage: string|null;
  avatarImageFormat: string;
  Place: Lugar;
  from: Date;
  to: Date;
  hour: string;
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
    'data:image/png;base64,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';
  base64Image: string | null = null;

  map!: mapboxgl.Map;

  myForm!: FormGroup;

  posicion: string|any = '36.420103,-6.148869';

  accessTokenMapBox: string =
    'pk.eyJ1IjoiYWxsb3ViZXR2ZXIxODEyIiwiYSI6ImNsY3RhZ2o5dTBqMHAzb3MxeHZzZ3lyanEifQ.2Jw1OyBFbyNkNAubvzRJeA';

  constructor(private sanitizer: DomSanitizer, private router: Router, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiYWxsb3ViZXR2ZXIxODEyIiwiYSI6ImNsY3RhZ2o5dTBqMHAzb3MxeHZzZ3lyanEifQ.2Jw1OyBFbyNkNAubvzRJeA',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-6.148869, 36.420103], // longitud, latitud
      zoom: 10, // zoom inicial
    });
    const mark = new mapboxgl.Marker().setLngLat([36.420103, -6.148869]).addTo(this.map);

    this.myForm = this.fb.group({
      // Define tus controles de formulario y validaciones aquí
      name: ['', Validators.required],
      description: [''],
      placename: [''],
      placeaddress: [''],
      placecity: [''],
      placeprovince: [''],
      dateFrom: [''],
      dateTo: [''],
      starsAt: [''],
      // Agrega más controles según sea necesario
    });
  }

  searchLocation(event: Event) {
    event.preventDefault();
    var location = this.locationInput.nativeElement.value;

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
      });
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
          console.log(
            `Formato: ${format}, Ancho: ${width}px, Alto: ${height}px`
          );
          console.log(
            'Longitud de la cadena: ' + (fileReader.result as string).length
          );
          if ((format === 'jpeg' || format === 'png') && width <= 300 && height <= 2048
          ) {
            this.base64Image = fileReader.result as string;
            this.imagenCargada = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.base64Image
            );
            console.log(this.base64Image);
            console.log('Longitud de la cadena: ' + this.base64Image.length);
            console.log(
              'tamaño del archivo: ' +
                this.base64Image.length / 1.37 / 1024 +
                ' kb'
            );
          } else if (format !== 'jpeg' && format !== 'png') {
            console.log('El archivo seleccionado no es una imagen jpg o png');
          } else if (width > 300 || height > 2048) {
            console.log(
              'Las dimensiones de la imagen son mayores a 300px de alto'
            );
          }
        };
        image.onerror = () => {
          console.log(
            'El archivo seleccionado no es un archivo de imagen válido.'
          );
        };
        image.src = fileReader.result as string;
      };
      fileReader.readAsDataURL(file);
    }
  }

  registrarEvento(evento: Event) {
    const inputActivado = evento.target as HTMLInputElement;
    alert('registrado');
    
    evento.preventDefault();
    console.log(this.myForm.get('name')?.value);

    let newPlace: Lugar = {
      id: 0,
      name: this.myForm.get('placename')?.value,
      address: this.myForm.get('placeaddress')?.value,
      lonlat: this.posicion,
      localidad: this.myForm.get('placecity')?.value,
      provincia: this.myForm.get('placeprovince')?.value,
    };

    let newEvent: EventData = {
      id: 0,
      Name: this.myForm.get('name')?.value,
      Description: this.myForm.get('description')?.value,
      themes: [1,2,3],//Arreglar esto
      avatarImage: '',//Terminar
      avatarImageFormat: '',
      Place: newPlace,
      from: new Date(),
      to: new Date(),
      hour: '15:30'
    }

    alert("Evento necesita ser terminado y almacenado para enviar.");
    console.log(JSON.stringify(newEvent));

  }

  iraEventos(event: Event) {
    event.preventDefault();
    this.router.navigate(['/listaeventos']);
  }
}
