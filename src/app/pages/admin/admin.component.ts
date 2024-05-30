import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { ModifyCommonUserComponent } from '../../components/modals/modify-common-user/modify-common-user.component';
import { ModifyEventComponent } from '../../components/modals/modify-event/modify-event.component';
import { ModifyOrganizationComponent } from '../../components/modals/modify-organization/modify-organization.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePipe } from '@angular/common';

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

export interface Usuario {
  id: number;
  Nombre: string;
  Apellidos: string;
  Nick: string;
  Email: string;
  Blocked: boolean;
}

export interface Evento {
  id: number;
  Nombre: string;
  Lugar: number;
  Descripcion: string;
  Fecha: string;
  Hora: string;
}

export interface Organization{
  id: number;
  Nombre: string;
  Descripcion: string;
  Nick: string;
  Email: string;
  Blocked: boolean;
}

export interface Lugar{
  id: number;
  Nombre: string;
  Lat: string;
  Lon: string;
  Direccion: string;
  Localidad: string;
  Provincia: string;
}

const ELEMENT_DATA_USERS: Usuario[] = [
  {id: 1, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 2, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 3, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 4, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
];

const ELEMENT_DATA_EVENTS: Evento[] = [
  {id: 1, Nombre: 'Feria del Caballo Jerez 2025', Lugar: 1, Descripcion: 'Vive la feria del caballo en Jerez', Fecha: '25/05/2025', Hora: '17:30'},
]

const ELEMENT_DATA_ORGANIZATIONS: Organization[] = [
  {id: 1, Nombre: 'Ayuntamiento de Chiclana de la Frontera', Descripcion: 'Ayuntamiento de la localidad de Chiclana de la Frontera', Nick: 'ayuntamientochicl', Email: 'info@ayuntamientochiclana.es', Blocked: false},
]

const ELEMENT_DATA_PLACES: Lugar[] = [
  {id: 1, Nombre: 'Recinto Ferial', Lat: '32.23', Lon: '23.32', Direccion: 'Recinto Ferial', Localidad: 'Jerez de la Frontera', Provincia: 'Cádiz'}
]

interface DataType {
  value: string;
  viewValue: string;
}



const COLUMN_DEFINITIONS: {[key: string]: string[]} = {
  1: ['id', 'Nombre', 'Apellidos', 'Nick', 'Email', 'Blocked'],
  2: ['id', 'Nombre', 'Descripcion', 'Nick', 'Email', 'Blocked'],
  3: ['id', 'Nombre', 'Lugar', 'Descripcion', 'Fecha', 'Hora'],
  /* 4: ['id', 'Nombre', 'Lat', 'Lon', 'Direccion', 'Localidad', 'Provincia'], */
  // Más tipos aquí
}

interface event{
  id: number,
  img: string,
  nombre: string,
  organizador: string,
  from: Date |null,
  to: Date |null,
  ciudad: string,
  provincia: number,
  generos: number[],
  generosString: string
}



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule, MatButtonModule, RouterLink, MatSidenavModule, NgxPaginationModule, FormsModule, MatNativeDateModule, DatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  p: number = 1;

  selectedValue: string = "1";

  datatypeselect: DataType[] = [
    {value: '1', viewValue: 'Usuarios Comunes'},
    {value: '2', viewValue: 'Organizaciones'},
    {value: '3', viewValue: 'Eventos'},
    /* {value: '4', viewValue: 'Lugares'}, */
  ];

  eventList: event[] = [
    {
      id: 1,
      img: '../../../assets/img/salon-manga-chiclana.jpg',
      nombre: 'Salón del Manga Chiclana 2024',
      organizador: 'Ayuntamiento de Chiclana de la Frontera',
      from: new Date('2024-04-30'),
      to: new Date('2024-05-05'),
      ciudad: 'Chiclana de la Frontera',
      provincia: 0,
      generos: [1,2],
      generosString: "Literatura, Deportes"
    },
    {
      id: 2,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024 Málaga',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      from: new Date('2024-04-28'),
      to: new Date('2024-05-03'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 2,
      generos: [3,5],
      generosString: "Cultura, Viajes"
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
      generos: [3,4],
      generosString: "Cultura, Ocio"
    },
    {
      id: 4,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024 Sevilla',
      organizador: 'Delegación de Cultura Provincia de Sevilla',
      from: new Date('2024-05-15'),
      to: new Date('2024-05-25'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 1,
      generos: [1,2,3,4],
      generosString: "Literatura, Deportes, Cultura, Ocio"
    },
    {
      id: 5,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Laser Tag Jaén',
      organizador: 'Casa de la Juventud Chiclana',
      from: new Date('2024-06-20'),
      to: new Date('2024-06-25'),
      ciudad: 'Chiclana de la frontera, Cádiz',
      provincia: 4,
      generos: [1,2,7,8],
      generosString: "Literatura, Deportes, Negocios, Tiempo Libre"
    },
    {
      id: 6,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024 Sevilla',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      from: new Date('2024-06-30'),
      to: new Date('2024-07-05'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 1,
      generos: [8,9],
      generosString: "Tiempo Libre, Reuniones Sociales"
    },
    {
      id: 7,
      img: '../../../assets/img/laser-tag.jpg',
      nombre: 'Torneo de Juegos Retro',
      organizador: 'Casa de la Juventud Chiclana',
      from: new Date('2024-7-10'),
      to: new Date('2024-07-15'),
      ciudad: 'Chiclana de la frontera, Cádiz',
      provincia: 0,
      generos: [1,4],
      generosString: "Literatura, Ocio"
    },
    {
      id: 8,
      img: '../../../assets/img/torneo-ajedrez.jpg',
      nombre: 'Torneo de Ajedrez Verano 2024 Malaga',
      organizador: 'Delegación de Cultura Provincia de Cádiz',
      from: new Date('2024-07-12'),
      to: new Date('2024-07-15'),
      ciudad: 'Cádiz, Cádiz',
      provincia: 2,
      generos: [1,2],
      generosString: "Literatura, Deportes"
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
      generos: [6,9],
      generosString: "Videojuegos, Tiempo Libre"
    }
  ];

  eventSearch: event[] = [];

  eventResult: event[] = [];

  filteredEvents: event[] = [];

  displayedColumns: string[] = [...COLUMN_DEFINITIONS['1'], 'modify', 'delete'];
  dataSource: any = new MatTableDataSource(ELEMENT_DATA_USERS);
  currentDataSource: string = '1';

  searchTerm: string = '';

  constructor(public dialog: MatDialog, private router: Router){
    this.eventResult = this.eventList;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  changeColumns(type: string) {
    this.displayedColumns = [...COLUMN_DEFINITIONS[type], 'modify', 'delete'];
  }

  cambiarDataSource(event: any){
    console.log("Activamos la función");
    this.dataSource = [];
    switch(this.selectedValue){
      case '1':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA_USERS);
        this.changeColumns('1');
        this.currentDataSource = '1';
        break;
      case '2':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA_ORGANIZATIONS);
        this.changeColumns('2');
        this.currentDataSource = '2';
        break;
      case '3':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA_EVENTS);
        this.changeColumns('3');
        this.currentDataSource = '3';
        break;
      /* case '4':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA_PLACES);
        this.changeColumns('4');
        this.currentDataSource = '4';
        break; */
    }
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modifyUser(id: number, currentdata: string, event: Event){
    event.preventDefault();
    console.log("Modificando el registro "+id+" de la tabla "+currentdata);
    switch(currentdata){
      case '1':
        console.log("Modificando el registro "+id+" de la tabla Usuarios Comunes");
        this.openModifyCommonUserDialog('0s', '0s', ELEMENT_DATA_USERS[id-1]);
        break;
      case '2':
        console.log("Modificando el registro "+id+" de la tabla Organizaciones");
        this.openModifyOrganizationDialog('0s', '0s', ELEMENT_DATA_ORGANIZATIONS[id-1]);
        break;
      case '3':
        console.log("Modificando el registro "+id+" de la tabla Eventos");
        this.openModifyEventDialog('0s', '0s', ELEMENT_DATA_EVENTS[id-1]);
        break;
      /* case '4':
        console.log("Modificando el registro "+id+" de la tabla Lugares");
        break; */
    }
  }

  deleteUser(id: number, currentdata: string, event: Event){
    event.preventDefault();
    console.log("Eliminando el registro "+id+" de la tabla "+currentdata);
  }

  openModifyCommonUserDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: any): void {
    const dialogRef = this.dialog.open(ModifyCommonUserComponent, {
      width: '800px',
      height: '800px',
      data: element,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openModifyOrganizationDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: any): void {
    const dialogRef = this.dialog.open(ModifyOrganizationComponent, {
      width: '800px',
      height: '800px',
      data: element,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openModifyEventDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: any): void {
    const dialogRef = this.dialog.open(ModifyEventComponent, {
      width: '800px',
      height: '800px',
      data: element,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

   searchByName(){
    console.log("Paso 3: Filtramos por nombre");

    if(this.searchTerm.length==0){
      console.log("Mensaje de Nombre: No se ha escrito ningun nombre. Pasamos al siguente filtro.");
    }else{
      console.log("Mensaje de Nombre: Se ha escrito al menos 1 caracter. Iniciando proceso de filtrado.");
      
      if(this.filteredEvents.length>0){
        this.eventSearch = this.filteredEvents;
      }

      const term = this.searchTerm.toLowerCase();
      this.filteredEvents = this.eventSearch.filter(obj =>
        obj.nombre.toLowerCase().includes(term));
      this.eventResult = this.filteredEvents;
      console.log("Proceso de filtrado por nombre finalizado. Número de elementos filtrados: "+this.eventResult.length);
    }
    
  }  /**/


}
