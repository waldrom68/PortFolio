import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FullPersonDTO, LaboralCareer } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService } from 'src/app/service/ui.service';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-career-item',
  templateUrl: './career-item.component.html',
  styleUrls: ['./career-item.component.css']
})
export class CareerItemComponent implements OnInit, OnDestroy {

  @Input() item: LaboralCareer;

  @Input() formData: LaboralCareer;

  // @Input() showBtnAction!: boolean;
  // @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<LaboralCareer> = new EventEmitter()
  @Output() onUpdate: EventEmitter<LaboralCareer> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<LaboralCareer> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  // formData: LaboralCareer;

  oldData: LaboralCareer;
  
  
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private formService: FormService,

    private dialog: MatDialog,

  ) { }

  ngOnInit() {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm : 0;
      }
    );
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)
  }
  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();

  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(laboralCareer: LaboralCareer) {

    this.showForm = !this.showForm;
    this.formData = laboralCareer;


    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }

    this.baseDataService.setCurrentBaseData(this.baseData)

  }

  verOrga(laboralCareer: LaboralCareer) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-info";

    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // dialogConfig.maxWidth = '700px';
    dialogConfig.data = {
      type: "info",
      message: [
        laboralCareer.organization.name,
        laboralCareer.organization.resume,
        laboralCareer.organization.url,
      ]
    };

    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }

  // PENDIENTE, FUE UNA PRUEBA DE LOS ALERT
  // DEBE INCLUIRSE EN TODOS LOS COMPOENETES QUE 
  // TENGAN MENSAJES ERROR, SUCCESS CON ALERT()
  verError() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-warn";

    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // dialogConfig.maxWidth = '700px';
    dialogConfig.data = {
      type: "error",
      message: [
        "Terrible error de programacion",
        "pruebe contratar a algun experto"
      ]
    };

    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }


  delete(laboralCareer: LaboralCareer) {
    // llamo al metodo del padre via emit()
    if (this.esAdmin) {
      this.onDelete.emit(laboralCareer);
    }
  }

  update(laboralCareer: LaboralCareer) {

    this.dataService.upDateEntity(laboralCareer, "/laboralcareer").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + laboralCareer.resume, "si realmente tiene la misma descripcion, procure hacer un pequeño cambio");
        // AQUI RESTAURO oldData
        laboralCareer = this.oldData;
      },
      complete: () => console.log("Completado el alta en Trayectoria Laboral")
    });


    this.toggleForm(laboralCareer);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData)


  }

  cancelation(laboralCareer: LaboralCareer) {
    this.toggleForm(laboralCareer);  // cierro el formulario
  }
}
