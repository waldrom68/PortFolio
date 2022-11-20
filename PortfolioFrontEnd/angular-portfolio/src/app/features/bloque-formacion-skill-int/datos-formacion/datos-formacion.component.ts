import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import {Studies} from '../../../data'
// import {FORMACION} from '../../../mock-data'

@Component({
  selector: 'app-datos-formacion',
  templateUrl: './datos-formacion.component.html',
  styleUrls: ['./datos-formacion.component.css']
})
export class DatosFormacionComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // intereses: Intereses[] = INTERESES;
  myData: Studies[] = [];
  
  constructor( private dataService: DataService, ) { 
    this.dataService.getStudies().subscribe(studie =>
      [this.myData = studie]
    );
  }
  ngOnInit(): void {

  }

}

