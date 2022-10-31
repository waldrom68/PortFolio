import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {

  trayectoria:any = [
    {"desde": "20/09/1993", "hasta": "28/02/2018", "empresa": "ITBA", "cargo":"Director mascapito"},
    {"desde": "15/02/1990", "hasta": "30/07/1994", "empresa": "autonomo", "cargo":"Freelance"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
