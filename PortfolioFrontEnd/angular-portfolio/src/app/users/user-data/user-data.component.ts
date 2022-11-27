import { Component, OnInit, Input } from '@angular/core';

import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta
import { Subscription } from 'rxjs';  // idem


import { UserService } from '../../service/user.service';  // para traer los datos de la db.json

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../data'


// Esta importacion fue reemplazada por user.service, quien se encargará de la gestion de los datos
// import { USERS } from '../mock-data';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})


export class UserDataComponent implements OnInit {
  faTimes = faTimes;
  
  showAddForm:boolean = false;
  subscriptionAddForm?: Subscription;
  
  
  users: User[] = [];
  isAdmin = true;
  UserData: User

  constructor(
    // Inicializamos los servicios del modulo User
      private userService: UserService, 
      private uiService:UiService,  // defino el servicio para el botton de mostrar form

  ) { }


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

  // Metodos propios de la clase UserDataComponent
  resetUser() {
    this.UserData = {
      "id": 0,
      "username": "",
      "password": "",
      "admin": false 
    }
  }
  displayForm() {
    // Alterna los estados de mostrar o no mostrar formulario
    this.showAddForm = !this.showAddForm;
  }
  setUser(user: User) {
    // Carga los datos en los atributos del Form.
    this.UserData = user;
    this.displayForm();  // Cierro el formulario
  }


  // Eventos recibidos desde: add-button-user.component.html
  // 
  toggleAddUser(value:any) {
    // Recibo el metodo y lo relaciono con el uiService.
    console.log("En user-data-compornets.ts recibo el valor de :", value);
    this.showAddForm = !this.showAddForm;
    this.uiService.onToggleComponet(value)
  }

  addUser(user: User) {
    // Con los datos del form, agrega un nuevo usuario a la DB 
    // via el userService y actualizo el array de users
    this.userService.addUsers(user).subscribe( (user) => {
      this.users.push(user); 
    });

    this.resetUser();  // Dejo en blanco el Formulario
    // this.displayForm();  // Cierro el formulario
  }
  
  editUser(user:User) {
    // Con los datos del form, modifico en la DB los datos del usuario
    this.userService.updateUsers(user).subscribe();

    this.resetUser();  // Dejo en blanco el Formulario
    this.displayForm();  // Cierro el formulario
    }
    
  deleteUser(user: User) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.userService.delUsers(user).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
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