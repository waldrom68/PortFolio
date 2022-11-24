import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { faTrash, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';

import { Interests } from '../../../data'


@Component({
  selector: 'app-interests-item',
  templateUrl: './interests-item.component.html',
  styleUrls: ['./interests-item.component.css']
})
export class InterestsItemComponent implements OnInit {
  @Input() item: Interests;


  // PENDIENTE vincular con el logueo
  @Input() isAdmin: boolean;

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
  }

  color:string = 'red';
  
  changeStyle($event: Event){
    console.log("hice un hover")
    this.color = $event.type == 'mouseover' ? 'yellow' : 'normal';
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
    if (this.isAdmin) {
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
