import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SoftSkill } from '../../../data'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-soft-item',
  templateUrl: './soft-item.component.html',
  styleUrls: ['./soft-item.component.css']
})
export class SoftItemComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;


  @Input() item: SoftSkill;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<SoftSkill> = new EventEmitter()
  @Output() onUpdate: EventEmitter<SoftSkill> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<SoftSkill> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  formData: SoftSkill;
  
  constructor(  private dataService: DataService, ) { }

  ngOnInit(): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  color:string = 'red';
  
  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(softskill: SoftSkill) {
    this.showForm = !this.showForm;
    // this.ocultarAcciones = !this.ocultarAcciones
    this.formData = softskill;
    // this.resize();  // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(softskill: SoftSkill) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
      this.onDelete.emit(softskill);
    }

  }
  cancelation(softskill: SoftSkill) {
    this.toggleForm(softskill);  // cierro el formulario
  }

  update(softskill: SoftSkill) {
    this.dataService.updateSoftSkill(softskill).subscribe();
    this.toggleForm(softskill);  // cierro el formulario

  }

}
