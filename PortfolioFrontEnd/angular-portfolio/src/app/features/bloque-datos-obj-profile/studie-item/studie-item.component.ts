import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { Studie, FullPersonDTO, Mensaje } from '../../../models'

import { faPen, faTimes, faTrash, } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService, UiService } from 'src/app/service/ui.service';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-studie-item',
  templateUrl: './studie-item.component.html',
  styleUrls: ['./studie-item.component.css']
})
export class StudieItemComponent implements OnInit, OnDestroy {

  @Input() item: Studie;

  @Input() formData: Studie;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<Studie> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Studie> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Studie> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  oldData: Studie;



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

    // private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 
    private uiService: UiService,
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

  toggleForm(studie: Studie) {
    this.showForm = !this.showForm;
    this.formData = studie;

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

  verOrga(studie: Studie) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-info";

    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // dialogConfig.maxWidth = '700px';
    dialogConfig.data = new Mensaje("info", [
      studie.organization.name,
      studie.organization.resume,
    ], 0, studie.organization.url);


    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }


  delete(studie: Studie) {
    // llamo al metodo del padre via emit()
    if (this.esAdmin) {
      this.onDelete.emit(studie);
    }
  }

  update(studie: Studie) {





    
    this.dataService.upDateEntity(studie, "/studie").subscribe({
      next: (v) => {
        console.log("Guardado correctamente")
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);

      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + this.oldData.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr(msg,);

        console.log("Se quizo agregar sin exito a: " + studie.name, "si realmente tiene el mismo nombre, procure hacer un pequeño cambio");
        // AQUI RESTAURO oldData
        studie.endDate = this.oldData.endDate;
        studie.organization = this.oldData.organization;
        studie.startDate = this.oldData.startDate;
        studie.degree = this.oldData.degree;
        studie.name = this.oldData.name;
      },
      complete: () => console.log("Completado el alta en Formación")
    });


    this.toggleForm(studie);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData)

  }

  cancelation(studie: Studie) {
    this.toggleForm(studie);  // cierro el formulario
  }

  // ngAfterViewInit(): void {
  //   let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }

}
