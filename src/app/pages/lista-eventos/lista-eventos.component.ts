import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [MatInputModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule, MatButtonModule, RouterLink, MatSidenavModule],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent {

}
