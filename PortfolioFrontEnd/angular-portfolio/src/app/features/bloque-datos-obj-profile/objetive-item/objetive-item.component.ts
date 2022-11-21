import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Users} from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

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
