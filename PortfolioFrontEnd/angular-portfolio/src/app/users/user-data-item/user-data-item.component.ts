import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';

import { User } from '../../data'

@Component({
  selector: 'app-user-data-item',
  templateUrl: './user-data-item.component.html',
  styleUrls: ['./user-data-item.component.css']
})
export class UserDataItemComponent implements OnInit {
  faTimes = faTimes;
  faPen = faPen
  
  @Input() user : User;
  // extraigo el delete para que lo maneje la lista de usuarios y no la instancia de usuario
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter()
  @Output() onToggleUser: EventEmitter<User> = new EventEmitter()

  
  prueba:string = "User item data";
  constructor() {
  }
  
  ngOnInit() {
  }
  
  onDelete(user: User) {
    console.log("Recibo pedido de eliminar un item del listado");
    // llamo al metodo del padre via emit()
    this.onDeleteUser.emit(user);
  }

  onToggle(user: User) {
    console.log("Recibo pedido de modificar un item del listado");
    // llamo al metodo del padre via emit()
    this.onToggleUser.emit(user);
  }
}
