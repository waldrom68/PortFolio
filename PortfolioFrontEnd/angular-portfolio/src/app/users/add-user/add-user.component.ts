import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { User } from '../../data'


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() onAddUser: EventEmitter<User> = new EventEmitter
 

  username:string = "";
  password:string = "";
  admin:boolean = false;
  id:number=0;

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    if(this.username.length > 0 && this.password.length > 0) {
      // return
      
      // const {id, username, password, admin} = this
      // const newData = this
      
      const newData:User = {
        id: Math.trunc(Math.random()*100),
        username: this.username, 
        password: this.password, 
        admin: this.admin, 
      }
      
      this.onAddUser.emit(newData);
    }
      
  }

} 
