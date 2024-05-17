import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-modal-lugar',
  standalone: true,
  imports: [],
  templateUrl: './modal-lugar.component.html',
  styleUrl: './modal-lugar.component.css'
})
export class ModalLugarComponent {

  coordinate!: any;
  googleCoordinates!: any;

  map!: mapboxgl.Map;

  posicion: string = "";

  arraycoordinates: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalLugarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.coordinate = data;
    console.log(this.coordinate);
    this.arraycoordinates = this.coordinate.toString().split(',');

    this.googleCoordinates = this.arraycoordinates[0] + ',' + this.arraycoordinates[1];


  }

  ngOnInit(): void{
    this.map = new mapboxgl.Map({
      accessToken:
        'pk.eyJ1IjoiYWxsb3ViZXR2ZXIxODEyIiwiYSI6ImNsY3RhZ2o5dTBqMHAzb3MxeHZzZ3lyanEifQ.2Jw1OyBFbyNkNAubvzRJeA',
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [parseFloat(this.arraycoordinates[1]), parseFloat(this.arraycoordinates[0])], // longitud, latitud
      zoom: 16, // zoom inicial
    });
    this.posicion = this.googleCoordinates;
    let marcador = new mapboxgl.Marker()
    .setLngLat([parseFloat(this.arraycoordinates[1]), parseFloat(this.arraycoordinates[0])]) // Longitud y latitud del marcador
    .addTo(this.map);

  }



}
