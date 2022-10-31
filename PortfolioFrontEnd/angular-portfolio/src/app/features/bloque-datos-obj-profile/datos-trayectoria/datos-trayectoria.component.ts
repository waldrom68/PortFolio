import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {

  @Input() experienciaObj:any


  constructor() { }

  ngOnInit(): void {
  }

}
