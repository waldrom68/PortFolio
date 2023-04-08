import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FullPersonDTO, LaboralCareer, Mensaje } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService, UiService } from 'src/app/service/ui.service';
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

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

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
  // element: object;
  // fragment: string = 'Init';

  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private formService: FormService,
    private uiService: UiService, 
    
    // private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 
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

    // this.formService.setCurrentForm(0);

  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(laboralCareer: LaboralCareer) {
    this.showForm = !this.showForm;
    this.formData = laboralCareer;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)


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
    dialogConfig.data = new Mensaje("info", [
            laboralCareer.organization.name,
            laboralCareer.organization.resume,
          ], 0 ,
          laboralCareer.organization.url )

    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
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
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo obtener los datos sin exito," + e.error.mensaje ? e.error.mensaje : e.message)
        msg.push("Se quizo modificar sin exito al trabajo");
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr( msg,); 

        console.log("Se quizo agregar sin exito a: " + laboralCareer.resume, "si realmente tiene la misma descripcion, procure hacer un pequeño cambio");
        // AQUI RESTAURO oldData
        laboralCareer.endDate = this.oldData.endDate;
        laboralCareer.organization = this.oldData.organization;
        laboralCareer.resume = this.oldData.resume;
        laboralCareer.roleposition = this.oldData.roleposition;
        laboralCareer.startDate = this.oldData.startDate;

      },
      complete: () => console.log("Completado el alta en Trayectoria Laboral")
    });


    this.toggleForm(laboralCareer);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData)


  }

  cancelation(laboralCareer: LaboralCareer) {
    this.toggleForm(laboralCareer);  // cierro el formulario
  }

  // ngAfterViewInit(): void {
  //   let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }
  

}
