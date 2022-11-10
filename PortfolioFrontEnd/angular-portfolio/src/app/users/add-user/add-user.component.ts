import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { User } from '../../data'


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
 

  // username:string = this.editUser.username;
  // password:string = "";
  // admin:boolean = false;
  // id:number=0;

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log("hice click en el submit del form y ahora tengo estos datos:", this.UserData.username )

    if(this.UserData.username.length > 0 && this.UserData.password.length > 0) {
      // return
      
      // const {id, username, password, admin} = this
      // const newData = this
      if (this.UserData.id==0) {
        console.log("Es un registro nuevo con estos datos:", this.UserData )

        const newData:User = {
          id: Math.trunc(Math.random()*100),
          username: this.UserData.username, 
          password: this.UserData.password, 
          admin: this.UserData.admin, 
        }
        console.log("via el emit, llamo a onAddUser.emit(newData) con esta info:", newData)
        this.onAddUser.emit(newData);
        
        } else {
          const newData:User = {
            id: this.UserData.id,
            username: this.UserData.username, 
            password: this.UserData.password, 
            admin: this.UserData.admin, 
          }
          console.log("Via editUser llamado desde el html, llamo a onUpdateUser.emit(newData) con esta info:",this.UserData )
          this.onModificarUser.emit(this.UserData);
        }
    }
      
  }

} 
