import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FullPersonDTO, Mensaje, SoftSkill } from '../../../models'

import { faPen, faTimes, faTrash, faHand } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService } from 'src/app/service/ui.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';

@Component({
  selector: 'app-soft-item',
  templateUrl: './soft-item.component.html',
  styleUrls: ['./soft-item.component.css']
})
export class SoftItemComponent implements OnInit, OnDestroy {
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

  ngOnInit(): void {
        // this.oldData = this.item;
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({} , this.item)
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
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();
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

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }
  }

  delete(softskill: SoftSkill) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(softskill);
    }

  }

  update(softskill: SoftSkill) {
    this.dataService.upDateEntity(softskill, "/softskill").subscribe({
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
        this.formData.name = this.oldData.name;
        this.formData.assessment = this.oldData.assessment;
      },
      complete: () => console.log("Completada la actualizacion del softskill")
    } );

    this.toggleForm(softskill);  // cierro el formulario

  }

  cancelation(softskill: SoftSkill) {
    this.toggleForm(softskill);  // cierro el formulario
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
