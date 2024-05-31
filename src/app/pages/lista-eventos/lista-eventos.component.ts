import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { MatNativeDateModule } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FiltersComponent } from '../../components/modals/filters/filters.component';

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
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule, MatButtonModule, RouterLink, MatSidenavModule, NgxPaginationModule, FormsModule, MatNativeDateModule, DatePipe],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit{

  searchTerm: string = '';

  fromTerm: Date | null = null;

  toTerm: Date|null = null;

  provinceTerm: number = -1;

  p: number = 1;

  filtersApplied: number = 0;

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
    false
  ];

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

  themesList: number[] = [];

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    console.log("Entrando en el constructor del componente.");
    this.route.params.subscribe(params => {
      // Aquí puedes acceder a los parámetros de la ruta
      console.log(params);
      // Por ejemplo, si tienes un parámetro llamado 'id', puedes acceder a él así:
      const id = params['idgenero'];
      console.log('ID:', id);
      if(id==undefined){
        this.eventResult = this.eventlist;
      }else{
        this.themesSelected[id-1]=true;
        this.themesList.push(parseInt(id));
        this.filter();
      }
      
    });
  }

  ngOnInit(): void {
    console.log("Entrando en el NgOnInit del componente.");

    this.route.params.subscribe(params => {
      // Aquí puedes acceder a los parámetros de la ruta
      console.log(params);
      // Por ejemplo, si tienes un parámetro llamado 'id', puedes acceder a él así:
      const id = params['idgenero'];
      console.log('ID:', id);
      if(id==undefined){
        this.eventResult = this.eventlist;
      }else if(Number.isNaN(parseInt(id)) || id>12){
        this.router.navigate(['/listaeventos']);
      }else{
        this.themesSelected[id-1]=true;
        this.themesList.push(parseInt(id));
        this.filter();
      }
      
    });
  }


  filter(){

    /* Filtraremos por los siguientes elementos, de mayor a menor restricción:
    - Fecha de Inicio y/o Fecha de Fin
    - Provincia
    - Género/s
    - Nombre */

    //Reiniciamos toda la estructura de búsqueda

    this.filtersApplied = 0;

    this.eventSearch = [];

    this.eventResult = [];

    this.filteredEvents = [];

    console.log("Iniciamos el proceso de filtrado.");

    console.log("Limpiando lista de pantalla...");

    console.log("Preparando listado para la búsqueda.");

    this.eventSearch = this.eventlist;

    this.searchByDate();
    this.searchByProvince();
    this.searchByName();
    this.searchByThemes();

    if(this.filtersApplied==0){
      this.eventResult = this.eventlist;
    }
    this.p=1;
    
  }

  searchByDate(){
    console.log("Paso 1: Filtramos por fecha");

    if(this.fromTerm == null && this.toTerm == null){
      console.log("Mensaje de Fechas: No se han seleccionado ninguna fecha. Pasamos al siguente filtro.");
    }else{
      console.log("Mensaje de Fechas: Al menos se ha añadido una fecha al filtro. Iniciando proceso de filtrado.");
      this.filtersApplied++;
      if(this.filteredEvents.length>0){
        this.eventSearch = this.filteredEvents;
      }

      if(this.fromTerm != null){
        this.filteredEvents = this.eventSearch.filter(obj =>
          obj.from! >= this.fromTerm!);
        if(this.toTerm != null){
          this.filteredEvents = this.filteredEvents.filter(obj =>
            obj.from! <= this.toTerm!);
        }
        this.eventResult = this.filteredEvents;
      }else{
        if(this.toTerm != null){
          this.filteredEvents = this.eventSearch.filter(obj =>
            obj.from! <= this.toTerm!);
          this.eventResult = this.filteredEvents;
        }
      }
      console.log("Proceso de filtrado por fechas finalizado. Número de elementos filtrados: "+this.eventResult.length);
    }
  }
  
  searchByProvince(){
    console.log("Paso 2: Filtramos por provincias");

    if(this.provinceTerm == -1){
      console.log("Mensaje de Provincias: No se ha seleccionado ninguna provincia. Pasamos al siguente filtro.");
    }else{
      console.log("Mensaje de Provincias: Se ha seleccionado una provincia. Iniciando proceso de filtrado.");
      this.filtersApplied++;
      if(this.filteredEvents.length>0){
        this.eventSearch = this.filteredEvents;
      }

      this.filteredEvents = this.eventSearch.filter(obj =>
        obj.provincia == this.provinceTerm );
      this.eventResult = this.filteredEvents;
      console.log("Proceso de filtrado por provincias finalizado. Número de elementos filtrados: "+this.eventResult.length);
    }
    
  }

  searchByName(){
    console.log("Paso 3: Filtramos por nombre");

    if(this.searchTerm.length==0){
      console.log("Mensaje de Nombre: No se ha escrito ningun nombre. Pasamos al siguente filtro.");
    }else{
      console.log("Mensaje de Nombre: Se ha escrito al menos 1 caracter. Iniciando proceso de filtrado.");
      this.filtersApplied++;
      if(this.filteredEvents.length>0){
        this.eventSearch = this.filteredEvents;
      }

      const term = this.searchTerm.toLowerCase();
      this.filteredEvents = this.eventSearch.filter(obj =>
        obj.nombre.toLowerCase().includes(term));
      this.eventResult = this.filteredEvents;
      console.log("Proceso de filtrado por nombre finalizado. Número de elementos filtrados: "+this.eventResult.length);
    }
    
  } 

  selectTheme(event: MatCheckboxChange){
    console.log(event.source.value);
    const isChecked = event.checked;
    if(isChecked){
      this.themesList.push(parseInt(event.source.value));
    }else{
      this.themesList = this.themesList.filter(num => num !== parseInt(event.source.value));
    }
    console.log('Checkbox is checked:', isChecked);
    console.log(this.themesList);
    this.filter();
  }

  searchByThemes(){
    console.log("Paso 4: Filtramos por géneros");

    if(this.themesList.length==0){
      console.log("Mensaje de Género: No se ha seleccionado ningun género. Pasamos al siguente filtro.");
      console.log("Número de elementos filtrados: "+this.eventResult.length);

    }else{
      console.log("Mensaje de Género: Se ha seleccionado al menos 1 géneros. Iniciando proceso de filtrado.");
      this.filtersApplied++;
      if(this.filteredEvents.length>0){
        this.eventSearch = this.filteredEvents;
      }

      this.filteredEvents = this.eventSearch.filter(item => 
        item.generos.some(genero => this.themesList.includes(genero))
      );

      this.eventResult = this.filteredEvents;
      console.log("Proceso de filtrado por género finalizado. Número de elementos filtrados: "+this.eventResult.length);
    }
  }


  mostrarFiltrosResponsive(){
    this.openDialogmodalFiltros('0', '0');
  }

  openDialogmodalFiltros(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(FiltersComponent, {
      width: '500px',
      height: '800px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.searchTerm = result['name'];
      this.fromTerm = result['from'];
      this.toTerm = result['to'];
      this.provinceTerm = result['province'];
      this.themesList = result['themes'];
      this.filter();
    });
  }
  

  reiniciarFiltros(){

    console.log("Filtros reiniciados.");
    this.eventResult = this.eventlist;
    this.filteredEvents = [];
    this.eventSearch = [];

    this.searchTerm = '';

    this.fromTerm = null;

    this.toTerm = null;

    this.provinceTerm = -1;

    this.themesList = [];

    this.filtersApplied = 0;

    for(let i=0;i<this.themesSelected.length;i++){
      this.themesSelected[i]=false;
    }

  }

}
