import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {LaboralCareer, Organization, RolePosition, FullPersonDTO} from '../../models'


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {

  // SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: any;

  DATAPORTFOLIO: FullPersonDTO;
  
  myData: LaboralCareer[] = [];
  formData: LaboralCareer;  // instancia vacia, para cuando se solicite un alta


  // user: Person;
  myOrganizations: Organization[];
  myRolePositions: RolePosition[];

 
  constructor( 
    private dataService: DataService, 

    public matDialog: MatDialog,

    ) {  }


  ngOnInit(): void {
    this.DATAPORTFOLIO = this.dataService.getData();
    this.myData = this.DATAPORTFOLIO.laboralCareer;
    this.myOrganizations = this.DATAPORTFOLIO.organization;
    this.myRolePositions = this.DATAPORTFOLIO.roleposition;


    // Verifica si está logueado como ADMIN
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin();

    this.resetForm()

   }

  resetForm() {
    this.formData = { 
      id:0, 
      resume:"",
      startDate: new Date(),
      endDate: new Date(),
      orderdeploy:0,
      status:true,
      organization: {
        id: 0,
        name:"",
        resume:"",
        url:"",
        person:0
    },
      roleposition:{
        id: 0,
        name:"",
        person:0
    } ,
      person: 0
    }
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
      this.dataService.delLaboralCareer(this.itemParaBorrar).subscribe( {
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.DATAPORTFOLIO.laboralCareer = this.myData;
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


  // upDateItem(career: LaboralCareer) {
  //   this.dataService.updateLaboralCareer(career).subscribe();
  // }
  
  addItem(laboralCareer: LaboralCareer) {
    this.dataService.addLaboralCareer(laboralCareer).subscribe( {
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        // v.organization = this.formData.organization;
        // v.roleposition = this.formData.roleposition;
        // v.person = this.DATAPORTFOLIO.id;
        this.myData.push(v);
        this.DATAPORTFOLIO.laboralCareer = this.myData;
        console.log("Esto estoy guardando en myData", this.myData)
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + laboralCareer.resume);
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
