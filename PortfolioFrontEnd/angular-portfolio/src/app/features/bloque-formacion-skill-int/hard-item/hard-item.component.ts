import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import { HardSkill } from '../../../data';

@Component({
  selector: 'app-hard-item',
  templateUrl: './hard-item.component.html',
  styleUrls: ['./hard-item.component.css']
})
export class HardItemComponent implements OnInit {
  @Input() item: HardSkill;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin: boolean;

  @Output() onDelete: EventEmitter<HardSkill> = new EventEmitter()
  
   
  faTimes = faTimes;
  faPen = faPen;
  
  constructor() { }

  ngOnInit(): void {
  }

  delete(hardskill: HardSkill) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      this.onDelete.emit(hardskill);
    } else {
      console.log("No es admin", this.isAdmin)
    }

  }
}
