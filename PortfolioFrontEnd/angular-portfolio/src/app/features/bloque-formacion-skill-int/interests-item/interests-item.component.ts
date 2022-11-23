import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Interests } from '../../../data'


@Component({
  selector: 'app-interests-item',
  templateUrl: './interests-item.component.html',
  styleUrls: ['./interests-item.component.css']
})
export class InterestsItemComponent implements OnInit {
  @Input() item: Interests;


  // PENDIENTE vincular con el logueo
  @Input() isAdmin: boolean;

  @Output() onDelete: EventEmitter<Interests> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Interests> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Interests> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;

  constructor() {

   }

  ngOnInit(): void {
  }

  toggleForm(interest: Interests) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      this.onToggleForm.emit(interest);
    }
  }

  delete(interest: Interests) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      this.onDelete.emit(interest);
    }

  }

  update(interest: Interests) {
    // llamo al metodo del padre via emit()
    // if (this.isAdmin) {
    //   this.onUpdate.emit(interest);
    // }
    console.log("Quiero editar a ", interest)
  }

}
