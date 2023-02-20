import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../models'


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() UserData: User

  @Output() onAddUser: EventEmitter<User> = new EventEmitter
  @Output() onUpdateUser: EventEmitter<User> = new EventEmitter
  @Output() onModificarUser: EventEmitter<User> = new EventEmitter
 

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    // console.log("hice click en el submit del form y ahora tengo estos datos:", this.UserData)

    console.log("estoy en onSubmit")
    // Aqui debieran ir las reglas de validacion de los campos del formulario
    if(this.UserData.username.length > 0 && this.UserData.password.length > 0) {

      if (this.UserData.id==0) {
        // console.log("Es un registro nuevo con estos datos:", this.UserData )
        // console.log("via el emit, llamo a onAddUser.emit(newData) con esta info:", this.UserData )
        this.onAddUser.emit(this.UserData );
        
        } else {
          // console.log("Via editUser llamado desde el html, llamo a onUpdateUser.emit(newData) con esta info:",this.UserData )
          this.onModificarUser.emit(this.UserData);
        }
    }
      
  }

} 
