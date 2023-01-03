import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Studie, Organization, Person, Degree } from '../../../data'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-studie-item',
  templateUrl: './studie-item.component.html',
  styleUrls: ['./studie-item.component.css']
})
export class StudieItemComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;


  @Input() item: Studie;
  @Input() user: Person;
  @Input() myOrganizations: Organization[];
  @Input() myDegrees: Degree[];

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<Studie> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Studie> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Studie> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  formData: Studie;


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

  toggleForm(studie: Studie) {
    this.showForm = !this.showForm;
    // this.ocultarAcciones = !this.ocultarAcciones
    this.formData = studie;
    // this.resize();  // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(studie: Studie) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
      this.onDelete.emit(studie);
    }

  }
  cancelation(studie: Studie) {
    this.toggleForm(studie);  // cierro el formulario
  }

  update(studie: Studie) {
    this.dataService.updateStudie(studie).subscribe();
    this.toggleForm(studie);  // cierro el formulario

  }
}
