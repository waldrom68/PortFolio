import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Users } from '../../../data'

import { faTimes, faTrash, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-objetive-item',
  templateUrl: './objetive-item.component.html',
  styleUrls: ['./objetive-item.component.css']
})
export class ObjetiveItemComponent implements OnInit {
  @Input() item: Users;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin : boolean;

  @Output() delete: EventEmitter<Users> = new EventEmitter()
  
  faTimes = faTimes;
  faTrash = faTrash;
  faPencil = faPencil;
  faPlusCircle = faPlusCircle;

  showAddForm:boolean = false;
  subscriptionAddForm?: Subscription;
  UserData: Users

  constructor( private dataservice: DataService, ) {
    this.UserData = this.item;
   }

  ngOnInit() {
  }
    // Metodos propios de la clase UserDataComponent
    resetUser() {
      this.UserData = {
            "id": 0,
            "name": "",
            "lastName": "",
            "pathFoto": "",
            "location": "",
            "profession": "",
            "profile": "",
            "objetive": "",
            "since": "",
            "username": "",
            "password": "",
            "admin": false
          }
    }

    toggleForm() {
      // Alterna los estados de mostrar o no mostrar formulario
      this.showAddForm = !this.showAddForm;
    }

    onDelete(user: Users) {
      // llamo al metodo del padre via emit()
      if (this.isAdmin) {
          this.delete.emit(user);
      }

    }
}
