import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Degree } from '../../../data'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-degree-item',
  templateUrl: './degree-item.component.html',
  styleUrls: ['./degree-item.component.css']
})
export class DegreeItemComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;


  @Input() item: Degree;

  @Input() showBtnAction!: boolean;
  @Input() formData: Degree;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<Degree> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Degree> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Degree> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  // formData: Organization;

  constructor(private dataService: DataService,) { }

  ngOnInit(): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  color:string = 'red';

  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(organization: Degree) {
    this.showForm = !this.showForm;
    // this.ocultarAcciones = !this.ocultarAcciones
    this.formData = organization;
    // this.resize();  // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(degree: Degree) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
      this.onDelete.emit(degree);
    }

  }
  cancelation(degree: Degree) {
    this.toggleForm(degree);  // cierro el formulario
  }

  update(degree: Degree) {
    this.dataService.updateDegree(degree).subscribe();
    this.toggleForm(degree);  // cierro el formulario

  }

}
