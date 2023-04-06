import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/auth.service';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { UiService } from 'src/app/service/ui.service';

import { MessageBoxComponent } from 'src/app/shared/message-box/message-box.component';

import { FullPersonDTO, SocialNetwork } from '../../models'


@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.css']
})
export class SocialNetworkComponent implements OnInit, OnDestroy {
  showForm: boolean = false;  // flag para mostrar o no el formulario
  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  private itemParaBorrar: any;  // objeto que se está por borrar, sirve para reestablecer si cancela borrado

  message: string;


  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


  constructor(
    private dataService: DataService,
    private uiService: UiService,

    private baseDataService: BaseDataService,

    private matDialog: MatDialog,

    private adminService: AdminService,

    @Inject(MAT_DIALOG_DATA) public data: { message: string, },
    public dialogRef: MatDialogRef<SocialNetworkComponent>, //OrganizationModal


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


  }


  ngOnDestroy(): void {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();

  }


  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction


  }

  cancelation(socialnetwork: SocialNetwork) {
    this.toggleForm();
  }

  addItem(socialnetwork: SocialNetwork) {
    console.log(socialnetwork);
    
    // Por problemas en el backend, doy un alta via edit, colocando su id en valor -1
    // socialnetwork.id = -1;
    this.dataService.addEntity(socialnetwork, "/socialnetwork").subscribe({
      next: (v) => {
        console.log("Guardado correctamente")
        this.uiService.msgboxOk( ['Datos guardados exitosamente'],);

        socialnetwork.id = v.id;
        socialnetwork.person = this.baseData.id;
        this.baseData.socialnetwork.push(socialnetwork);
        this.baseDataService.setCurrentBaseData(this.baseData);
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + socialnetwork.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr( msg,); 

        console.log("Se quizo agregar sin exito a: " + socialnetwork.name);
      },
      complete: () => console.log("Completado el alta de la Red social")
    }
    );
    // this.resetForm();
    this.toggleForm();
  }


  openModalDelete(SocialNetwork: SocialNetwork) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = SocialNetwork;
    this.openDeleteModal(SocialNetwork);
  }


  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/socialnetwork").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar)
          this.uiService.msgboxOk(['Se ha eliminado exitosamentee'])

          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.baseData.socialnetwork = this.baseData.socialnetwork.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.itemParaBorrar = null;
          this.baseDataService.setCurrentBaseData(this.baseData);

        },
        error: (e) => {
          let msg = new Array()
          msg.push("Se quizo eliminar sin exito a: " + this.itemParaBorrar.name);
          msg.push(e.error.mensaje ? e.error.mensaje : e.message);
          this.uiService.msgboxErr(msg,)

          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
        },
        complete: () => console.log("Completada la actualizacion de las redes sociales")
      }
      );
    }

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
      title: `Hola, está por eliminar uno de las Redes sociales`,
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
        console.log("Dialogo output: ", data);
        if (data) { this.delItem() }
      }

    )
  }

}
