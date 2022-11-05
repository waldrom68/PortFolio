import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

import { faTimes, faUserSecret } from '@fortawesome/free-solid-svg-icons';


import { Users } from '../../data'
import { USERS } from '../../mock-data';

// Est importaciones serán reemplazadas por user.service, quien se encargará de la gestion de los datos
// import { USERS } from '../mock-data';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  users: Users[] = [];
  faTimes = faTimes
 
  prueba:string = "Users Data"
  constructor(
      private userService: UserService
  ) { }

  isAdmin = true

  ngOnInit() {
    // Like promise, levanta los datos del servicio
    // no controla las excepciones del callback de 
    // la promesa
    this.userService.getUsers().subscribe(users =>
      [this.users = users]
      );
      // console.log(this.users)
  }

}
