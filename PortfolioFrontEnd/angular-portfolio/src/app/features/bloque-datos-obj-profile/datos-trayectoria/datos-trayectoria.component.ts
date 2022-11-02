import { Component, Input, OnInit } from '@angular/core';

import {WorkExperience} from '../../../data'
import {WORKEXPERIENCE} from '../../../mock-data'

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {

  experiencia: WorkExperience[] = WORKEXPERIENCE
  
  constructor() {
    
  }
  
  ngOnInit(): void {


  }

}
