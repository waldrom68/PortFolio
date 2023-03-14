import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {LaboralCareer, Organization, RolePosition, FullPersonDTO} from '../../models'


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit, OnDestroy {

  showForm: boolean = false;  // flag para mostrar o no el formulario

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: any;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  
  // myData: LaboralCareer[] = [];
  formData: LaboralCareer;  // instancia vacia, para cuando se solicite un alta

  // myOrganizations: Organization[];
  // myRolePositions: RolePosition[];

   // Validacion Admin STATUS
   esAdmin: boolean;
   private AdminServiceSubscription: Subscription | undefined;
  
  constructor( 
    private dataService: DataService, 
    private baseDataService: BaseDataService,

    public matDialog: MatDialog,

    private adminService: AdminService,
    ) {  }


  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );


    // this.myData = this.baseData.laboralCareer;
    // this.myOrganizations = this.baseData.organization;
    // this.myRolePositions = this.baseData.roleposition;
    // if (this.baseData.organization) {
    //     this.myOrganizations = this.baseData.organization;
    //   }

    //   if (this.baseData.roleposition) {
    //     this.myRolePositions = this.baseData.roleposition;
    //   }

      
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.resetForm()
       
   }

   ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  resetForm() {
    this.formData = new LaboralCareer();
  }

  
  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }  
  
  cancelation(career: LaboralCareer) {
    this.toggleForm();
  }

  openModalDelete(laboralCareer: LaboralCareer){
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = laboralCareer;
    this.openDeleteModal(laboralCareer)
  }

  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/laboralcareer").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.baseData.laboralCareer = this.baseData.laboralCareer.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.baseDataService.setCurrentBaseData(this.baseData)
          this.itemParaBorrar = null;

        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: " , this.itemParaBorrar);
        },
        complete: () => {console.log("Completada la eliminacion en la Trayectoria Laboral");}

      });
    }
  }


  addItem(laboralCareer: LaboralCareer) {
    this.dataService.addEntity(laboralCareer, "/laboralcareer").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        laboralCareer.id = v.id;
        laboralCareer.person = this.baseData.id;
        this.baseData.laboralCareer.push(v);
        this.baseDataService.setCurrentBaseData(this.baseData)
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + laboralCareer.resume, "si realmente tiene la misma descripcion, procure hacer un pequeño cambio");
      },
      complete: () => console.log("Completado el alta en Trayectoria Laboral")
    });
    this.resetForm();
    this.toggleForm();

  }

  openDeleteModal(data:any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-delete";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "eliminar",
      title: `Hola, está por eliminar uno de los trabajos`,
      description: `¿Estás seguro de eliminar "${data.organization.name} (${data.roleposition.name})" ?`,
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
        if (data) {this.delItem() }
      }

    )
  }
}
