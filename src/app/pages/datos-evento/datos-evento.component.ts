import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalLugarComponent } from '../../components/modals/modal-lugar/modal-lugar.component';
import {MatInputModule} from '@angular/material/input';

interface genero{
  id: number,
  denominacion: string
}

interface evento{
  id: number,
  img: string,
  nombre: string,
  id_organizador: number,
  organizador: string,
  fecha_hora: string,
  direccion: string,
  ciudad: string,
  descripcion: string,
  generos: genero[],
  latlon: string,
}


@Component({
  selector: 'app-datos-evento',
  standalone: true,
  imports: [RouterLink, MatInputModule],
  templateUrl: './datos-evento.component.html',
  styleUrl: './datos-evento.component.css'
})
export class DatosEventoComponent {

  eventos: evento[] = [
    {
      id: 1,
      img: '../../../assets/img/feria-caballo-jerez_red.jpg',
      nombre: 'Feria del Caballo Jerez 2024',
      id_organizador: 1,
      organizador: 'Ayuntamiento de Jerez',
      fecha_hora: '30/04/2024, 15:30',
      direccion: 'Recinto ferial de Jerez de la Frontera, 11111',
      ciudad: 'Jerez de la Frontera, Cádiz',
      descripcion: 'Celebra la Feria del Caballo este fin de semana en Jerez de la Frontera',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ],
      latlon: '36.420103,-6.148869'
    },
    {
      id: 2,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Salón del Manga Chiclana 2024',
      id_organizador: 2,
      organizador: 'Ayuntamiento de Chiclana de la Frontera',
      fecha_hora: '30/04/2024, 15:30',
      direccion: 'SalaBox, Recinto ferial de Chiclana de la Frontera, 11111',
      ciudad: 'Chiclana de la Frontera, Cádiz',
      descripcion: 'Celebra el Salón del Manga de Chiclana este fin de semana en Chiclana',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ],
      latlon: '36.420103,-6.148869'
    },
    {
      id: 3,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      id_organizador: 3,
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      direccion: 'Casa de la Juventud Cádiz, 11111',
      ciudad: 'Cádiz, Cádiz',
      descripcion: 'Torneo clasificatorio para el torneo nacional de Ajedrez de España',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ],
      latlon: '36.420103,-6.148869'
    },
    {
      id: 4,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      id_organizador: 4,
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      direccion: 'Sala Box, Recinto Ferial de Chiclana, 11130',
      ciudad: 'Chiclana de la frontera, Cádiz',
      descripcion: 'Torneo de Laer Tag en Chiclana de la Frontera',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ],
      latlon: '36.420103,-6.148869'
    }
  ];

  eventoSeleccionado: evento = {
      id: 0,
      img: '',
      nombre: '',
      id_organizador: 0,
      organizador: '',
      fecha_hora: '',
      direccion: '',
      ciudad: '',
      descripcion: '',
      generos: [],
      latlon: ''
  };

  id: any;

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog){
    console.log(this.activatedRoute);
    this.activatedRoute.params.subscribe(params => {
        this.id = params['id'] || null;
        console.log(this.id-1);
        this.eventoSeleccionado = this.eventos[this.id-1];
      });
  }

  modalLugar(event:Event){
    event.preventDefault();
    this.openDialogmodalLugar('0','0');
  }


  openDialogmodalLugar(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ModalLugarComponent, {
      width: '500px',
      height: '600px',
      data: this.eventoSeleccionado.latlon,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  
}
