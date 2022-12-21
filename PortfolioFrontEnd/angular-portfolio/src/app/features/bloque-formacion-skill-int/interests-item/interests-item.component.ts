import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faTrash, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Interests } from '../../../data'


@Component({
  selector: 'app-interests-item',
  templateUrl: './interests-item.component.html',
  styleUrls: ['./interests-item.component.css']
})
export class InterestsItemComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;



  @Input() item: Interests;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<Interests> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Interests> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Interests> = new EventEmitter()
  
 
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  formData: Interests;

  
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

  toggleForm(interest: Interests) {
    this.showForm = !this.showForm;
    // this.ocultarAcciones = !this.ocultarAcciones
    this.formData = interest;
    // this.resize();  // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(interest: Interests) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
      this.onDelete.emit(interest);
    }

  }

  update(interest: Interests) {
    this.dataService.updateInterest(interest).subscribe();
    this.toggleForm(interest);  // cierro el formulario

  }

  // addInterest(interest: Interests) {
  //   this.dataService.updateInterest(interest).subscribe();
  //   this.toggleForm(interest);  // cierro el formulario
  // }

  cancelation(interest: Interests) {
    this.toggleForm(interest);  // cierro el formulario
  }
  
}