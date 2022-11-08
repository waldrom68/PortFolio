import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserDataComponent } from '../user-data/user-data.component';


import { User } from '../../data'


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Output() onAddUser: EventEmitter<User> = new EventEmitter

  miusername:string = "";
  mipassword:string = "";
  miadmin:boolean = false;


  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {
    if(this.miusername.length > 0 && this.mipassword.length > 0) {
      alert("agregando al usuario: " + this.miusername);
      // return
    }
    
    const newUser: User = {
      id: 15,
      username: this.miusername,
      password: this.mipassword,
      admin: this.miadmin
    }
    this.onAddUser.emit(newUser);
  }

} 
