import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../service/user.service';

import { MessageBoxComponent } from '../../shared/message-box/message-box.component';


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

  isAdmin = false;
  enableForm = false;

  UserData: User
  
  // @Input() user:Users
  constructor(
    // Inicializamos los servicios del modulo User
      private userService: UserService, 
      // private messagebox: MessageBoxComponent
  ) { }

  resetUser() {
    this.UserData = {
      "id": 0,
      "username": "",
      "password": "",
      "admin": false 
    }
  }

  ngOnInit() {
    // Inicializo atributos para el Form
    this.resetUser()

    // Like promise, levanta los datos del servicio 
    // Ejecutamos el servicio al inicializar el modulo
    // -no controla las excepciones del callback de la promesa-
    this.userService.getUsers().subscribe(users => 
      [this.users = users] 
    );

  }

  // btnClick(accept:any) {
  //   console.log("Respuesta de aceptación:", accept)
  // }
  
  displayForm() {
    // Alterna los estados de mostrar o no mostrar formulario
    this.enableForm = !this.enableForm;
  }

  setUser(user: User) {
    // Carga los datos en los atributos del Form.
    this.UserData = user;
    this.displayForm();
  }

  addUser(user: User) {
    // Con los datos del form, agrega un nuevo usuario a la DB 
    // via el userService y actualizo el array de users
    this.userService.addUsers(user).subscribe( (user) => {
      this.users.push(user); 
    });

    this.resetUser();  // Dejo en blanco el Formulario
    this.displayForm();
  }
  
  editUser(user:User) {
    // Con los datos del form, modifico en la DB los datos del usuario
    console.log("en user-data-component, recibo la instruccion de registrar los datos en la db")
    console.log("recibo este user:", user)
    console.log("tengo esta variable:", this.UserData)
    // completo los campos del formulario con los atributos de la instancia
    this.UserData = {
      "id": user.id,
      "username": user.username,
      "password": user.password,
      "admin": user.admin
    }
    
    this.userService.updateUsers(this.UserData).subscribe();

    this.resetUser();  // Dejo en blanco el Formulario
    this.displayForm();
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
  

  




}