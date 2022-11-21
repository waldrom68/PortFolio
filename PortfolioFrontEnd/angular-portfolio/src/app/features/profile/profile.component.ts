import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import {Users} from '../../data'


// import {DATA} from '../../../mock-data'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // intereses: Intereses[] = INTERESES;
  myData: Users;

  // miPerfil:string[] = newDatos.perfil.split('\n');

  constructor( private dataService: DataService, ) { 
    this.dataService.getGralData().subscribe(user =>
      this.myData = user
    );
  }
    
  ngOnInit(): void {

  }

  delete(user: Users) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
    this.myData.profile = ""
    this.dataService.updateGralData(user).subscribe()
  }
}
