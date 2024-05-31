import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule

import { MatNativeDateModule } from '@angular/material/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

interface filters{
  'name': string,
  'from': Date | null,
  'to': Date | null,
  'province': number,
  'themes': number[]
}

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressSpinnerModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatCheckboxModule, MatButtonModule, RouterLink, MatSidenavModule, NgxPaginationModule, FormsModule, MatNativeDateModule, DatePipe],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {

  searchTerm: string = '';

  fromTerm: Date | null = null;

  toTerm: Date|null = null;

  provinceTerm: number = -1;

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

  themesList: number[] = [];


  constructor(private dialogRef: MatDialogRef<FiltersComponent>,){

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
  }

  sendFilter(){

    let filtersToApply: filters = {
      'name': this.searchTerm,
      'from': this.fromTerm,
      'to': this.toTerm,
      'province': this.provinceTerm,
      'themes': this.themesList
    }
    let data = filtersToApply;
    this.dialogRef.close(data);
  }

  filter(){
    console.log(this.fromTerm);
  }
}
