import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { LaboralCareer } from '../../data'
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
  
  constructor( private dataService: DataService, ) { }
  

  ngOnInit(): void {
    this.dataService.getLaboralCareer().subscribe(career =>
      [this.myData = career]
    );
  }

  delete(careers: LaboralCareer) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delLaboralCareers(careers).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
        this.myData = this.myData.filter( (t) => { return t.id !== careers.id } )
      }
    );
  }

}
