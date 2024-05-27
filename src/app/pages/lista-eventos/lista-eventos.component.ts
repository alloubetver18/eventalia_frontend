import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { MatNativeDateModule } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

interface event{
  id: number,
  img: string,
  nombre: string,
  organizador: string,
  from: Date |null,
  to: Date |null,
  ciudad: string,
  provincia: number,
  generos: number[]
}

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule, MatButtonModule, RouterLink, MatSidenavModule, NgxPaginationModule, FormsModule, MatNativeDateModule, DatePipe],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit{

  searchTerm: string = '';

  fromTerm: Date | null = null;

  dateFilter: string = '2024-04-30';  // Puedes ajustar esta fecha según necesites

  toTerm: Date|null = null;

  p: number = 1;

  eventlist: event[] = [
    {
      id: 1,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Salón del Manga Chiclana 2024',
      organizador: 'Ayuntamiento de Chiclana de la Frontera',
      from: new Date('2024-04-30'),
      to: new Date('2024-05-05'),
      ciudad: 'Chiclana de la Frontera',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 2,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      from: new Date('2024-04-28'),
      to: new Date('2024-05-03'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 3,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      from: new Date('2024-05-30'),
      to: new Date('2024-06-05'),
      ciudad: 'Chiclana de la frontera, Cádiz',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 4,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      from: new Date('2024-05-15'),
      to: new Date('2024-05-25'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 5,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      from: new Date('2024-06-20'),
      to: new Date('2024-06-25'),
      ciudad: 'Chiclana de la frontera, Cádiz',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 6,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      from: new Date('2024-06-30'),
      to: new Date('2024-07-05'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 7,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      from: new Date('2024-7-10'),
      to: new Date('2024-07-15'),
      ciudad: 'Chiclana de la frontera, Cádiz',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 8,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      from: new Date('2024-07-12'),
      to: new Date('2024-07-15'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 0,
      generos: [1,2]
    },
    {
      id: 9,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag',
      organizador: 'Casa de la Juventud Chiclana',
      from: new Date('2024-08-10'),
      to: new Date('2024-08-15'),
      ciudad: 'Chiclana de la frontera, Cádiz',
      provincia: 0,
      generos: [1,2]
    }
  ];

  eventSearch: event[] = [];

  eventResult: event[] = [];

  ngOnInit(): void {
    this.eventResult = this.eventlist;
  }


  filter(){
    if(this.searchTerm){
      //buscamos por nombre
      this.searchByName();
    }
    if(this.fromTerm){
      //Buscamos por fecha
      console.log(this.fromTerm);
      this.searchByFromDate();
      //Si no hemos buscado aún: Buscamos en todos los registros
      //Si lo hemos hecho: buscamos en el array de resultados
    }
    if(this.toTerm){
      this.searchByToDate();
    }
  }


  /* filterEvents() {
    const term = this.searchTerm.toLowerCase();
    const targetDate = new Date(this.dateFilter);

    this.eventSearch = this.eventlist.filter(event => {
      const isAfterDate = event.fecha_hora! >= targetDate;

      const matchesTerm = (Object.keys(event) as (keyof Event)[]).some(key => {
        // Evitamos la comparación en la propiedad 'fecha_hora' porque es un objeto Date
        if (key !== 'fecha_hora') {
          return event[key].toString().toLowerCase().includes(term);
        }
        return false;
      });

      return isAfterDate && matchesTerm;
    });
  } */


   searchByName(){
    this.eventSearch = [];
    console.log(this.searchTerm);
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      this.eventSearch = this.eventlist.filter(event =>
        Object.values(event).some(value =>
          value.toString().toLowerCase().includes(term)
        )
      );
      this.eventResult = this.eventSearch;
    } else {
      this.eventSearch = this.eventlist;
    }
  } /**/

  searchByFromDate(){
    //Comprobar si ya se ha buscado
    console.log(this.eventSearch.length);
    if(this.eventSearch.length>0){
      //Si se ha buscado, filtrar desde esta lista
      console.log("comprobarndo la fecha");

      this.eventSearch = this.eventSearch.filter(item => item.from!  >= this.fromTerm!);
      this.eventResult = this.eventSearch;
      this.eventSearch = [];
    }else{
      this.eventSearch = this.eventlist.filter(item => item.from!  >= this.fromTerm!);
      this.eventResult = this.eventSearch;
      this.eventSearch = [];
    }
  }

  searchByToDate(){
    //Comprobar si ya se ha buscado
    console.log(this.eventSearch.length);
    if(this.eventSearch.length>0){
      //Si se ha buscado, filtrar desde esta lista
      console.log("comprobarndo la fecha");

      this.eventSearch = this.eventSearch.filter(item => item.to!  <= this.toTerm!);
      this.eventResult = this.eventSearch;
    }else{
      this.eventSearch = this.eventlist.filter(item => item.to!  <= this.toTerm!);
      this.eventResult = this.eventSearch;
    }
  }

}
