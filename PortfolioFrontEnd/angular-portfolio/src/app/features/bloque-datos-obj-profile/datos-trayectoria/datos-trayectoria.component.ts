import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { LaboralCareer } from '../../../data'
// import {WORKEXPERIENCE} from '../../../mock-data'

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // intereses: Intereses[] = INTERESES;
  myData: LaboralCareer[] = [];
  

  constructor( private dataService: DataService, ) { 
    this.dataService.getLaboralCareer().subscribe(career =>
      [this.myData = career]
    );
  }
  
  ngOnInit(): void {


  }

}
