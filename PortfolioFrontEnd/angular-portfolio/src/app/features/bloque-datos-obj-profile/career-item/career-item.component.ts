import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LaboralCareer } from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-career-item',
  templateUrl: './career-item.component.html',
  styleUrls: ['./career-item.component.css']
})
export class CareerItemComponent implements OnInit {
  @Input() item: LaboralCareer;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin : boolean;

  @Output() delete: EventEmitter<LaboralCareer> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;

  constructor() { }

  ngOnInit() {
  }
  
  onDelete(career: LaboralCareer) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      console.log("Realizo pedido de eliminar un item del listado");
      this.delete.emit(career);
    }

  }
}
