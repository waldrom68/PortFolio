import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FullPersonDTO, HardSkill, Mensaje } from '../../../models';

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService } from 'src/app/service/ui.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';


@Component({
  selector: 'app-hard-item',
  templateUrl: './hard-item.component.html',
  styleUrls: ['./hard-item.component.css']
})
export class HardItemComponent implements OnInit, OnDestroy {

  @Input() item: HardSkill;

  @Input() formData: HardSkill;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<HardSkill> = new EventEmitter()
  @Output() onUpdate: EventEmitter<HardSkill> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<HardSkill> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  oldData: HardSkill;

  // Se utiliza para la generacion de los Id en el html, evita conflictos en la ejecucion 
  // del widgets.js
  regex = /[^a-zA-Z]+/g;
  // item.name.replace("/[a-zA-Z]+/g","")


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
  ) {

  }

  ngOnInit(): void {
    // this.oldData = this.item;
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

  toggleForm(hardskill: HardSkill) {
    this.showForm = !this.showForm;
    this.formData = hardskill;

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

  delete(hardskill: HardSkill) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(hardskill);
    }

  }

  update(hardskill: HardSkill) {
    // Actualizacion de hardskill
    this.dataService.upDateEntity(hardskill, "/hardskill").subscribe({
      next: (v) =>  {
        console.log("Guardado correctamente")
        this.alertDialog(
          "ok",
          ['Datos guardados exitosamente'],
          1500 );
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + this.oldData.name);
        msg.push(e.message);
        this.alertDialog("error", msg, 0 );

        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        hardskill = this.oldData;
      },
      complete: () => console.log("Completada la actualizacion del hardskill")
    });

    this.toggleForm(hardskill);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData);

  }

  cancelation(hardskill: HardSkill) {
    this.toggleForm(hardskill);  // cierro el formulario
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
