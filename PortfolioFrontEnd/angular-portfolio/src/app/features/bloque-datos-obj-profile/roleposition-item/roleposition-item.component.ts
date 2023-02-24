import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RolePosition } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-roleposition-item',
  templateUrl: './roleposition-item.component.html',
  styleUrls: ['./roleposition-item.component.css']
})
export class RolepositionItemComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;


  @Input() item: RolePosition;

  @Input() showBtnAction!: boolean;
  @Input() formData: RolePosition;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<RolePosition> = new EventEmitter()
  @Output() onUpdate: EventEmitter<RolePosition> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<RolePosition> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
 // formData: Degree; // Viene por un input
  oldData: RolePosition;
  
  constructor(private dataService: DataService,) { }

  ngOnInit(): void {
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

  toggleForm(rolePosition: RolePosition) {
    this.showForm = !this.showForm;
    // this.ocultarAcciones = !this.ocultarAcciones
    this.formData = rolePosition;
    // this.resize();  // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(rolePosition: RolePosition) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
      this.onDelete.emit(rolePosition);
    }

  }
  cancelation(rolePosition: RolePosition) {
    this.toggleForm(rolePosition);  // cierro el formulario
  }

  update(rolePosition: RolePosition) {
    this.dataService.updateRolePosition(rolePosition).subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        // this.myData.push(v);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + rolePosition.name);
        // Restauro valor original
        this.formData.name = this.oldData.name;
      },
      complete: () => console.log("Completado la actualizacion en Roles y Posiciones")
    });

    this.toggleForm(rolePosition);  // cierro el formulario

  }

}
