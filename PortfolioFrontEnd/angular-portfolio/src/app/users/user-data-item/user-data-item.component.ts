import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { faTimes, faPen } from '@fortawesome/free-solid-svg-icons';
// import { UiService } from 'src/app/service/ui.service';
// import { Subscription } from 'rxjs'


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
  @Input() isAdmin : boolean;
  
  // extraigo el delete/update/etc para que lo maneje la lista de usuarios y 
  // no la instancia de usuario
  @Output() onDeleteUser: EventEmitter<User> = new EventEmitter()
  @Output() onUpdateUser: EventEmitter<User> = new EventEmitter()
  @Output() onToggleUser: EventEmitter<User> = new EventEmitter()

  // Carga en el formulario, la instancia del usuario
  @Output() setUser: EventEmitter<User> = new EventEmitter()



  constructor(
    // private uiService:UiService
  ) {   }
  
  ngOnInit() {
  }
  

  onDelete(user: User) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      // console.log("Realizo pedido de eliminar un item del listado");
      this.onDeleteUser.emit(user);
    }

  }

  onUpdate(user: User) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      // console.log("Realizo pedido de modificar un item del listado");
      this.onUpdateUser.emit(user);
    }

  }

  onToggle(user: User) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      // console.log("Realizo pedido de alternar admin desde el listado");
      this.onToggleUser.emit(user);
    }
      
  }



}
