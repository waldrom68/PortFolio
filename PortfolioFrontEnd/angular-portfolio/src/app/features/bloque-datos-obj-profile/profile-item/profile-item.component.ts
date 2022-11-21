import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Users} from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.css']
})
export class ProfileItemComponent implements OnInit {
  @Input() item: Users;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin : boolean;

  @Output() delete: EventEmitter<Users> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;

  constructor() { }

  ngOnInit() {

  }
  onDelete(user: Users) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
        this.delete.emit(user);
    }

  }
}
