import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SoftSkill } from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-soft-item',
  templateUrl: './soft-item.component.html',
  styleUrls: ['./soft-item.component.css']
})
export class SoftItemComponent implements OnInit {
  @Input() item: SoftSkill;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin : boolean;

  @Output() onDeleteUser: EventEmitter<SoftSkill> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  
  constructor() { }

  ngOnInit() {
  }

  onDelete(skill: SoftSkill) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      console.log("Realizo pedido de eliminar un item del listado");
      this.onDeleteUser.emit(skill);
    }

  }

}
