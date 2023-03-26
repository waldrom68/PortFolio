import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FullPersonDTO, Mensaje, RolePosition } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';

@Component({
  selector: 'app-roleposition-item',
  templateUrl: './roleposition-item.component.html',
  styleUrls: ['./roleposition-item.component.css']
})
export class RolepositionItemComponent implements OnInit, OnDestroy {

  @Input() item: RolePosition;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<RolePosition> = new EventEmitter()
  @Output() onUpdate: EventEmitter<RolePosition> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<RolePosition> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  oldData: RolePosition;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
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
    this.BaseDataServiceSubscription?.unsubscribe();

  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(rolePosition: RolePosition) {
    this.showForm = !this.showForm;
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

      next: (v) => { 
        console.log("Guardado correctamente: ", v); 
        this.alertDialog(
          "ok",
          ['Datos guardados exitosamente'],
          1500 );

        // Debo actualizar dataBase, laboralcareer, la cual es copia del backend.
        // Como sólo se busca la info al iniciar el sistema, debo mantener una imagen
        // de lo que hago en la DB. 
        // Aquí lo hago para que se actualicen todas las relaciones laborales que 
        // contienen el RolePosition modificado, caso contrario, no se actualizaran 
        // las mismas en el listado de otras trayectorias que contengan el mismo 
        // rol/posicion.
        this.baseData.laboralCareer.forEach(element => {
          if (element.roleposition.id == rolePosition.id)
            element.roleposition.name = rolePosition.name;
        });
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + this.oldData.name);
        msg.push(e.message);
        this.alertDialog("error", msg, 0 );

        console.log("Se quizo modificar sin exito a: " + rolePosition.name);
        // Restauro valor original
        rolePosition = this.oldData;
      },

      complete: () => console.log("Completado la actualizacion en Roles y Posiciones")
    });
    
    this.toggleForm(rolePosition);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData);
  }
  
  cancelation(rolePosition: RolePosition) {
    this.toggleForm(rolePosition);  // cierro el formulario
  }
  // Mensaje de alerta.
  // type: "ok", "error", "info"
  alertDialog( type:string="ok", data:string[], timer:number=0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-warn";

    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // dialogConfig.maxWidth = '700px';
    dialogConfig.data = new Mensaje(type, data, timer)


    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }


}
