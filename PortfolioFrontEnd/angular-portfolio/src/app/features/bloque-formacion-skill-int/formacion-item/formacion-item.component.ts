import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Studies} from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formacion-item',
  templateUrl: './formacion-item.component.html',
  styleUrls: ['./formacion-item.component.css']
})
export class FormacionItemComponent implements OnInit {
  @Input() item: Studies;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin : boolean;

  @Output() delete: EventEmitter<Studies> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(studie: Studies) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      this.delete.emit(studie);
    }

  }
}
