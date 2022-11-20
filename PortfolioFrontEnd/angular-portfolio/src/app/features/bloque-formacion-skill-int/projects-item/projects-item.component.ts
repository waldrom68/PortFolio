import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Projects } from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projects-item',
  templateUrl: './projects-item.component.html',
  styleUrls: ['./projects-item.component.css']
})
export class ProjectsItemComponent implements OnInit {
  @Input() item: Projects;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin: boolean;

  @Output() onDelete: EventEmitter<Projects> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;

  constructor() { }

  ngOnInit(): void {
  }

  delete(project: Projects) {
    // llamo al metodo del padre via emit()
    if (this.isAdmin) {
      this.onDelete.emit(project);
    }

  }
}
