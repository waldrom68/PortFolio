import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HardSkill } from '../../../data';

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-hard-item',
  templateUrl: './hard-item.component.html',
  styleUrls: ['./hard-item.component.css']
})
export class HardItemComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;


  @Input() item: HardSkill;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<HardSkill> = new EventEmitter()
  @Output() onUpdate: EventEmitter<HardSkill> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<HardSkill> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  formData: HardSkill;

  constructor( private dataService: DataService, ) { }

  ngOnInit(): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  color:string = 'red';

  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(hardskill: HardSkill) {
    this.showForm = !this.showForm;
    // this.ocultarAcciones = !this.ocultarAcciones
    this.formData = hardskill;
    // this.resize();  // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(hardskill: HardSkill) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
      this.onDelete.emit(hardskill);
    }

  }
  cancelation(hardskill: HardSkill) {
    this.toggleForm(hardskill);  // cierro el formulario
  }

  update(hardskill: HardSkill) {
    this.dataService.updateHardSkill(hardskill).subscribe();
    this.toggleForm(hardskill);  // cierro el formulario

  }

}
