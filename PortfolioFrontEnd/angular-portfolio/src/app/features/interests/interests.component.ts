import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import {Interests} from '../../data'
// import {INTERESES} from '../../../mock-data'

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // intereses: Intereses[] = INTERESES;
  myData: Interests[] = [];

  constructor( private dataService: DataService, ) { }
    
  ngOnInit(): void {
    this.dataService.getInterests().subscribe(interest =>
      [this.myData = interest]
    );
  }
  
  deleteInterest(interest: Interests) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delInterests(interest).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de Users
        this.myData = this.myData.filter( (t) => { return t.id !== interest.id } )
      }
    );
  }

}
