import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SoftSkill } from '../../../models'

import { faPen, faTimes, faTrash, faHand } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-soft-item',
  templateUrl: './soft-item.component.html',
  styleUrls: ['./soft-item.component.css']
})
export class SoftItemComponent implements OnInit {
  // VINCULADO CON EL LOGUEO
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
  faHand = faHand;

  showForm: boolean = false;
  formData: SoftSkill;
  oldData: SoftSkill;
  
  // Se utiliza para la generacion de los Id en el html, evita conflictos en la ejecucion 
  // del widgets.js
  regex= /[^a-zA-Z]+/g;
  // item.name.replace("/[a-zA-Z]+/g","")

  constructor(  private dataService: DataService, ) { }

  ngOnInit(): void {
        // this.oldData = this.item;
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({} , this.item)

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
    this.formData = softskill;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(softskill: SoftSkill) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.flagUserAdmin) {
      this.onDelete.emit(softskill);
    }

  }

  update(softskill: SoftSkill) {
    this.dataService.updateSoftSkill(softskill).subscribe({
      next: (v) => console.log("Softskill guardado correctamente: ", v),
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        this.formData.name = this.oldData.name;
      },
      complete: () => console.log("Completada la actualizacion del softskill")
    } );

    this.toggleForm(softskill);  // cierro el formulario

  }

  cancelation(softskill: SoftSkill) {
    this.toggleForm(softskill);  // cierro el formulario
  }
}
