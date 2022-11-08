import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../service/user.service';

import { faTimes, faUserSecret } from '@fortawesome/free-solid-svg-icons';


import { User } from '../../data'
import { USERS } from '../../mock-data';
import { takeLast } from 'rxjs';

// Est importaciones serán reemplazadas por user.service, quien se encargará de la gestion de los datos
// import { USERS } from '../mock-data';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  users: User[] = [];
  faTimes = faTimes
 
  prueba:string = "Users Data"

  // @Input() user:Users

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

  deleteUser(user: User) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
    console.log("Padre recibe pedido de eliminar a:", user)
    this.userService.delUsers(user).subscribe( ()=> {
        this.users = this.users.filter( (t) => { return t.id !== user.id
        } )
      }
    );
  }

  toggleAdmin(user: User) {
    // Este codigo alterna entre admin y no admin para que se actualice en
    // el frontend
    console.log("Padre recibe pedido alternar admin:", user)
    user.admin = !user.admin

    this.userService.toggleAdminUsers(user).subscribe();

  }
  
  addUser(user: User) {
    console.log("aqui llegue", user)
    this.userService.addUsers(user).subscribe( (user) => {
      this.users.push(user); 
    });
  }
  
  
  updateUser(user: User) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontes, sin necesidad de recargar la pagina
    console.log("Padre recibe pedido de modificar a:", user)
    console.log("Los datos nuevos son:", user);
    user = {
      "id": user.id,
      "username": "ElBagallo",
      "password": "TieneSuerte",
      "admin": false
  }
    this.userService.updateUsers(user).subscribe();
  }
}