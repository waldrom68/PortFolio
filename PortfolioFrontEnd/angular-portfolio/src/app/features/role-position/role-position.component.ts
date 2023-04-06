import { Component, Inject, OnDestroy, OnInit  } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FullPersonDTO, RolePosition } from '../../models'

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-role-position',
  templateUrl: './role-position.component.html',
  styleUrls: ['./role-position.component.css']
})

export class RolePositionComponent implements OnInit, OnDestroy {
  showForm: boolean = false;  // flag para mostrar o no el formulario


  faPlusCircle = faPlusCircle;
  faTimes = faTimes;


  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario
  
  itemParaBorrar: any;

  message: string;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private uiService: UiService, 

    public matDialog: MatDialog,
    public dialog: MatDialog,

    private adminService: AdminService,
    private baseDataService: BaseDataService,

    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<RolePositionComponent>, //RolepositionModal

  ) { }

  ngOnInit(): void {

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
        // this.myData = currentData.roleposition;
      }
    );
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
    // this.resetForm();
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  // resetForm() {
  //   this.formData = new RolePosition();
  // }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }

  cancelation(rolePosition: RolePosition) {
    this.toggleForm();
  }

  openModalDelete(rolePosition: RolePosition) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = rolePosition;
    this.openDeleteModal(rolePosition)
  }

  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/roleposition").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.uiService.msgboxOk(['Se ha eliminado exitosamentee'] ,);

          this.baseData.roleposition = this.baseData.roleposition.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          // this.baseData.roleposition = this.myData;
          this.itemParaBorrar = null;
          this.baseDataService.setCurrentBaseData(this.baseData);
        },
        error: (e) => {
          let msg = new Array()
          msg.push("Se quizo eliminar sin exito a: " +  this.itemParaBorrar.name);
          msg.push(e.error.mensaje ? e.error.mensaje : e.message);
          this.uiService.msgboxErr( msg,); 

          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
        },
        complete: () => { console.log("Completada la actualizacion de la Posicion o Rol"); }

      });
    }
  }


  addItem(rolePosition: RolePosition) {
    this.dataService.addEntity(rolePosition, "/roleposition").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);

        rolePosition.id = v.id;
        rolePosition.person = this.baseData.id;
        this.baseData.roleposition.push(rolePosition);
        this.baseDataService.setCurrentBaseData(this.baseData);
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo agregar sin exito a: " + rolePosition.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr( msg,); 

        console.log("Se quizo agregar sin exito a: " + rolePosition.name);
      },
      complete: () => console.log("Completado el alta de la Posicion o Rol")
    });
    this.toggleForm();
    // this.resetForm();

  }

  openDeleteModal(data: any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-delete";
    dialogConfig.height = "350px";
    dialogConfig.maxHeight = "90%";
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "95%";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "eliminar",
      title: `Hola, está por eliminar una de las posiciones`,
      description: `¿Estás seguro de eliminar "${data.name}" ?`,
      // por defecto mostrararía Aceptar
      actionButtonText: "Eliminar",
      // por defecto mostraría Cancelar
      cancelActionText: "Conservar",
      // por defecto utilizará el definido en style.css "mat-dialog-container#modal-component"
      backColor: "",

      // atributos exclusivos para este message-box
      data: data,
    }

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(MessageBoxComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(
      data => {
        // console.log("Dialogo output: ", data);
        if (data) { this.delItem() }
      }

    )
  }


}
