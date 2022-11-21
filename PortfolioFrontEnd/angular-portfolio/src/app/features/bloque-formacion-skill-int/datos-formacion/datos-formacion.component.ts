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


  constructor( private dataService: DataService, ) {}

  ngOnInit(): void {
      this.dataService.getStudies().subscribe(studie =>
        [this.myData = studie]
      );

  }

  delete(studie: Studies) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delStudies(studie).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
        this.myData = this.myData.filter( (t) => { return t.id !== studie.id } )
      }
      );

  }

}

