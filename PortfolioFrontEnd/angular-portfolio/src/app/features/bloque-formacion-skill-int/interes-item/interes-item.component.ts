import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Interests } from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-interes-item',
  templateUrl: './interes-item.component.html',
  styleUrls: ['./interes-item.component.css']
})
export class InteresItemComponent implements OnInit {
  @Input() item: Interests;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin: boolean;

  @Output() onDelete: EventEmitter<Interests> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  
  constructor() { }

  ngOnInit(): void {

  }

  delete(interest: Interests) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      this.onDelete.emit(interest);
    }

  }
}
