import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HardSkill } from '../../../models';

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-hard-item',
  templateUrl: './hard-item.component.html',
  styleUrls: ['./hard-item.component.css']
})
export class HardItemComponent implements OnInit {
  // VINCULADO CON EL LOGUEO
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
  oldData: HardSkill;

  // Se utiliza para la generacion de los Id en el html, evita conflictos en la ejecucion 
  // del widgets.js
  regex= /[^a-zA-Z]+/g;  
  // item.name.replace("/[a-zA-Z]+/g","")
  
  constructor( private dataService: DataService, ) { 

  }

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

  toggleForm(hardskill: HardSkill) {
    this.showForm = !this.showForm;
    this.formData = hardskill;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(hardskill: HardSkill) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.flagUserAdmin) {
      this.onDelete.emit(hardskill);
    }

  }

  update(hardskill: HardSkill) {
    // Actualizacion de hardskill
    this.dataService.updateHardSkill(hardskill).subscribe( {
      next: (v) => console.log("Hardskill guardado correctamente: ", v),
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        this.formData.name = this.oldData.name;
      },
      complete: () => console.log("Completada la actualizacion del hardskill")
    } );

    this.toggleForm(hardskill);  // cierro el formulario

  }
  
  cancelation(hardskill: HardSkill) {
    this.toggleForm(hardskill);  // cierro el formulario
  }

}
