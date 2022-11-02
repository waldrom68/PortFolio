import { Component, Input, OnInit } from '@angular/core';

import {Experiencia} from '../../../data'
import {EXPERIENCIA} from '../../../mock-data'

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {

  experiencia: Experiencia[] = EXPERIENCIA

  @Input() newDatos:any

 
  
  constructor() {
    
  }
  
  ngOnInit(): void {


  }

}
