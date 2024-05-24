import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';

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
  Latitud: string;
  Longitud: string;
  Descripcion: string;
  Fecha: string;
  Hora: string;
}

const ELEMENT_DATA_USERS: Usuario[] = [
  {id: 1, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 2, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 3, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 4, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
];

const ELEMENT_DATA_EVENTS: Evento[] = [
  {id: 1, Nombre: 'Feria del Caballo Jerez 2025', Latitud: '26.34532423', Longitud: '-60.3434243', Descripcion: 'Vive la feria del caballo en Jerez', Fecha: '25/05/2025', Hora: '17:30'},
]

export interface PeriodicElement2 {
  name2: string;
  id: number;
  weight2: number;
  symbol2: string;
}

interface DataType {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, name: 'Prueba1', weight: 1.0079, symbol: 'H'},
  {id: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {id: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {id: 1, name2: 'Prueba2', weight2: 1.0079, symbol2: 'H'},
  {id: 2, name2: 'Helium', weight2: 4.0026, symbol2: 'He'},
  {id: 3, name2: 'Lithium', weight2: 6.941, symbol2: 'Li'},
  {id: 4, name2: 'Beryllium', weight2: 9.0122, symbol2: 'Be'},
  {id: 5, name2: 'Boron', weight2: 10.811, symbol2: 'B'},
  {id: 6, name2: 'Carbon', weight2: 12.0107, symbol2: 'C'},
  {id: 7, name2: 'Nitrogen', weight2: 14.0067, symbol2: 'N'},
  {id: 8, name2: 'Oxygen', weight2: 15.9994, symbol2: 'O'},
  {id: 9, name2: 'Fluorine', weight2: 18.9984, symbol2: 'F'},
  {id: 10, name2: 'Neon', weight2: 20.1797, symbol2: 'Ne'},
];

const ELEMENT_DATA3: PeriodicElement2[] = [
  {id: 1, name2: 'Prueba3', weight2: 1.0079, symbol2: 'H'},
  {id: 2, name2: 'Helium', weight2: 4.0026, symbol2: 'He'},
  {id: 3, name2: 'Lithium', weight2: 6.941, symbol2: 'Li'},
  {id: 4, name2: 'Beryllium', weight2: 9.0122, symbol2: 'Be'},
  {id: 5, name2: 'Boron', weight2: 10.811, symbol2: 'B'},
  {id: 6, name2: 'Carbon', weight2: 12.0107, symbol2: 'C'},
  {id: 7, name2: 'Nitrogen', weight2: 14.0067, symbol2: 'N'},
  {id: 8, name2: 'Oxygen', weight2: 15.9994, symbol2: 'O'},
  {id: 9, name2: 'Fluorine', weight2: 18.9984, symbol2: 'F'},
  {id: 10, name2: 'Neon', weight2: 20.1797, symbol2: 'Ne'},
];

const COLUMN_DEFINITIONS: {[key: string]: string[]} = {
  1: ['id', 'Nombre', 'Apellidos', 'Nick', 'Email', 'Blocked'],
  2: ['id', 'name', 'weight', 'symbol'],
  3: ['id', 'Nombre', 'Latitud', 'Longitud', 'Descripcion', 'Fecha', 'Hora'],
  4: ['id', 'name2'],
  // Más tipos aquí
}


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatTableModule, FormsModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatPaginatorModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  selectedValue!: string;

  datatypeselect: DataType[] = [
    {value: '1', viewValue: 'Usuarios Comunes'},
    {value: '2', viewValue: 'Organizaciones'},
    {value: '3', viewValue: 'Eventos'},
    {value: '4', viewValue: 'Lugares'},
  ];

  displayedColumns: string[] = [...COLUMN_DEFINITIONS['1'], 'modify', 'delete'];
  dataSource: any = new MatTableDataSource(ELEMENT_DATA_USERS);
  currentDataSource: string = '1';
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
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.changeColumns('2');
        this.currentDataSource = '2';
        break;
      case '3':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA_EVENTS);
        this.changeColumns('3');
        this.currentDataSource = '3';
        break;
      case '4':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA3);
        this.changeColumns('4');
        this.currentDataSource = '4';
        break;
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
        break;
      case '2':
        console.log("Modificando el registro "+id+" de la tabla Organizaciones");
        break;
      case '3':
        console.log("Modificando el registro "+id+" de la tabla Eventos");
        break;
      case '4':
        console.log("Modificando el registro "+id+" de la tabla Lugares");
        break;
    }
  }

  deleteUser(id: number, currentdata: string, event: Event){
    event.preventDefault();
    console.log("Eliminando el registro "+id+" de la tabla "+currentdata);
  }

}
