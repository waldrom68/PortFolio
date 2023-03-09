import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RolePosition } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-roleposition-item',
  templateUrl: './roleposition-item.component.html',
  styleUrls: ['./roleposition-item.component.css']
})
export class RolepositionItemComponent implements OnInit, OnDestroy {

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

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;


  constructor(
    private dataService: DataService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {

    this.AdminServiceSubscription?.unsubscribe();
  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(rolePosition: RolePosition) {
    this.showForm = !this.showForm;
    this.formData = rolePosition;
    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(rolePosition: RolePosition) {
    // llamo al metodo del padre via emit()
    if (this.esAdmin) {
      this.onDelete.emit(rolePosition);
    }

  }

  update(rolePosition: RolePosition) {
    this.dataService.upDateEntity(rolePosition, "/roleposition").subscribe({
      next: (v) => { console.log("Guardado correctamente: ", v); },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        rolePosition = this.oldData;
      },
      complete: () => console.log("Completado la actualizacion en Roles y Posiciones")
    });

    this.toggleForm(rolePosition);  // cierro el formulario

  }

  cancelation(rolePosition: RolePosition) {
    this.toggleForm(rolePosition);  // cierro el formulario
  }

}
