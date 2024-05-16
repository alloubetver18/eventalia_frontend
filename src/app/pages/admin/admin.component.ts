import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {FormsModule} from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
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

const ELEMENT_DATA_USERS: Usuario[] = [
  {id: 1, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 1, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 1, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
  {id: 1, Nombre: 'Alban', Apellidos: 'Loubet Vergara', Nick: 'albanlove', Email: 'albanlove@gmail.com', Blocked: false},
];

export interface PeriodicElement2 {
  name2: string;
  position2: number;
  weight2: number;
  symbol2: string;
}

interface DataType {
  value: string;
  viewValue: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Prueba1', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

const ELEMENT_DATA2: PeriodicElement2[] = [
  {position2: 1, name2: 'Prueba2', weight2: 1.0079, symbol2: 'H'},
  {position2: 2, name2: 'Helium', weight2: 4.0026, symbol2: 'He'},
  {position2: 3, name2: 'Lithium', weight2: 6.941, symbol2: 'Li'},
  {position2: 4, name2: 'Beryllium', weight2: 9.0122, symbol2: 'Be'},
  {position2: 5, name2: 'Boron', weight2: 10.811, symbol2: 'B'},
  {position2: 6, name2: 'Carbon', weight2: 12.0107, symbol2: 'C'},
  {position2: 7, name2: 'Nitrogen', weight2: 14.0067, symbol2: 'N'},
  {position2: 8, name2: 'Oxygen', weight2: 15.9994, symbol2: 'O'},
  {position2: 9, name2: 'Fluorine', weight2: 18.9984, symbol2: 'F'},
  {position2: 10, name2: 'Neon', weight2: 20.1797, symbol2: 'Ne'},
];

const ELEMENT_DATA3: PeriodicElement2[] = [
  {position2: 1, name2: 'Prueba3', weight2: 1.0079, symbol2: 'H'},
  {position2: 2, name2: 'Helium', weight2: 4.0026, symbol2: 'He'},
  {position2: 3, name2: 'Lithium', weight2: 6.941, symbol2: 'Li'},
  {position2: 4, name2: 'Beryllium', weight2: 9.0122, symbol2: 'Be'},
  {position2: 5, name2: 'Boron', weight2: 10.811, symbol2: 'B'},
  {position2: 6, name2: 'Carbon', weight2: 12.0107, symbol2: 'C'},
  {position2: 7, name2: 'Nitrogen', weight2: 14.0067, symbol2: 'N'},
  {position2: 8, name2: 'Oxygen', weight2: 15.9994, symbol2: 'O'},
  {position2: 9, name2: 'Fluorine', weight2: 18.9984, symbol2: 'F'},
  {position2: 10, name2: 'Neon', weight2: 20.1797, symbol2: 'Ne'},
];

const COLUMN_DEFINITIONS: {[key: string]: string[]} = {
  1: ['id', 'Nombre', 'Apellidos', 'Nick', 'Email', 'Blocked'],
  2: ['position', 'name', 'weight', 'symbol'],
  3: ['position2', 'name2', 'weight2'],
  4: ['position2', 'name2'],

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
        break;
      case '2':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.changeColumns('2');
        break;
      case '3':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA2);
        this.changeColumns('3');
        break;
      case '4':
        this.dataSource = new MatTableDataSource(ELEMENT_DATA3);
        this.changeColumns('4');
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

}
