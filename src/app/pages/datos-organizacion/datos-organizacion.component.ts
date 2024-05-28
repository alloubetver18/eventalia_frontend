import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-datos-organizacion',
  standalone: true,
  imports: [MatInputModule],
  templateUrl: './datos-organizacion.component.html',
  styleUrl: './datos-organizacion.component.css'
})
export class DatosOrganizacionComponent {
  organizaciones: any[] = [
    {
      id: 1,
      img: '../../../assets/img/feria-caballo-jerez_red.jpg',
      nombre: 'Ayuntamiento de Jerez',
      web: 'ayuntamientodejerez.es',
      email_contacto: 'info@ayuntamientodejerez.es',
      descripcion: 'Organización sin ánimo de lucro que gestiona todo tipo de trámites en la localidad de Jerez de la Frontera',
    },
    {
      id: 2,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Ayuntamiento de Chiclana de la Frontera',
      web: 'ayuntamientodechiclana.es',
      email_contacto: 'info@ayuntamientodechiclana.es',
      descripcion: 'Organización sin ánimo de lucro que gestiona todo tipo de trámites en la localidad de Chiclana de la Frontera',
    },
    {
      id: 3,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Delegación Cultural Provincia de Cádiz',
      web: 'delegacionculturacadiz.es',
      email_contacto: 'info@delegacionculturacadiz.es',
      descripcion: 'Organización sin ánimo de lucro que gestiona todo tipo de trámites en la provincia de Cádiz',
    },
    {
      id: 4,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Casa de la Juventud Chiclana de la Frontera',
      web: 'juventud.chiclana.es',
      email_contacto: 'info@juventudchiclana.es',
      descripcion: 'Organización sin ánimo de lucro que gestiona todo tipo de trámites para jovenes y adolescentes en la localidad de Chiclana de la Frontera',
    }
  ]

  organizacionSeleccionada: any = {
    id: 0,
    img: '',
    nombre: '',
    web: '',
    email_contacto: '',
    descripcion: '',
  };

  id: any;


  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog){
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'] || null;
      console.log(this.id-1);
      this.organizacionSeleccionada = this.organizaciones[this.id-1];
    });
  }



}
