import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ModalLugarComponent } from '../../components/modals/modal-lugar/modal-lugar.component';

interface genero{
  id: number,
  denominacion: string
}

interface evento{
  id: number,
  img: string,
  nombre: string,
  organizador: string,
  fecha_hora: string,
  ciudad: string,
  descripcion: string
  generos: genero[]
}


@Component({
  selector: 'app-datos-evento',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './datos-evento.component.html',
  styleUrl: './datos-evento.component.css'
})
export class DatosEventoComponent {

  eventos: evento[] = [
    {
      id: 1,
      img: '../../../assets/img/feria-caballo-jerez_red.jpg',
      nombre: 'Feria del Caballo Jerez 2024',
      organizador: 'Ayuntamiento de Jerez',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Jerez de la Frontera, Cádiz',
      descripcion: 'Celebra la Feria del Caballo este fin de semana en Jerez de la Frontera',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ]
    },
    {
      id: 2,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Salón del Manga Chiclana 2024',
      organizador: 'Ayuntamiento de Chiclana de la Frontera',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la Frontera, Cádiz',
      descripcion: 'Celebra el Salón del Manga de Chiclana este fin de semana en Chiclana',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ]
    },
    {
      id: 3,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Cádiz, Cádiz',
      descripcion: 'Celebra el Salón del Manga de Chiclana este fin de semana en Chiclana',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ]
    },
    {
      id: 4,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      fecha_hora: '30/04/2024, 15:30',
      ciudad: 'Chiclana de la frontera, Cádiz',
      descripcion: 'Celebra el Salón del Manga de Chiclana este fin de semana en Chiclana',
      generos: [
        {
          id: 4,
          denominacion: 'Cultura'
        }
      ]
    }
  ];

  eventoSeleccionado: evento = {
      id: 0,
      img: '',
      nombre: '',
      organizador: '',
      fecha_hora: '',
      ciudad: '',
      descripcion: '',
      generos: []
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
      height: '500px',
      data: '36.420103,-6.148869',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  
  
}
