import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../service/user.service';

import { faTimes, faUserSecret } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../data'


// Esta importacion fue reemplazada por user.service, quien se encargará de la gestion de los datos
// import { USERS } from '../mock-data';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})


export class UserDataComponent implements OnInit {
  users: User[] = [];
  faTimes = faTimes;

  isAdmin = true
  enableForm = false;


  
  // @Input() user:Users
  constructor(
    // Inicializamos los servicios del modulo User
      private userService: UserService
  ) { }

  ngOnInit() {
    // Like promise, levanta los datos del servicio 
    // Ejecutamos el servicio al inicializar el modulo
    // -no controla las excepciones del callback de la promesa-
    this.userService.getUsers().subscribe(users => 
      [this.users = users] 
    );

  }

  toggleForm() {
    this.enableForm = !this.enableForm;
  }

  deleteUser(user: User) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.userService.delUsers(user).subscribe( ()=> {
        this.users = this.users.filter( (t) => { return t.id !== user.id } )
      }
    );
  }

  toggleAdmin(user: User) {
    // Este codigo alterna entre admin y no admin para que se actualice en
    // el frontend
    user.admin = !user.admin

    this.userService.toggleAdminUsers(user).subscribe();

  }
  
  addUser(user: User) {
    this.userService.addUsers(user).subscribe( (user) => {
      this.users.push(user); 
    });
  }
  
  updateUser(user: User) {
  // Este codigo fue anulado porque no anda.
  console.log("Padre recibe pedido de modificar a:", user)
  this.toggleForm()

  user = {
    "id": user.id,
    "username": "ElBagallo",
    "password": "TieneSuerte",
    "admin": false }

    // this.userService.updateUsers(user).subscribe();
  }

}