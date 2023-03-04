import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AdminService, DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { Studie, Organization, Degree, FullPersonDTO} from '../../models'


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-datos-formacion',
  templateUrl: './datos-formacion.component.html',
  styleUrls: ['./datos-formacion.component.css']
})
export class DatosFormacionComponent implements OnInit, OnDestroy {

  showForm: boolean = false;  // flag para mostrar o no el formulario

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: any;

  DATAPORTFOLIO: FullPersonDTO;

  myData: Studie[] = [];
  formData: Studie;  // instancia vacia, para cuando se solicite un alta

  myOrganizations: Organization[];
  myDegrees: Degree[];

   // Validacion Admin STATUS
   esAdmin: boolean;
   private AdminServiceSubscription: Subscription | undefined;
  
 
  constructor( 
    private dataService: DataService,
    public matDialog: MatDialog,

    private adminService: AdminService,
    ) {  }


  ngOnInit(): void {
    this.DATAPORTFOLIO = this.dataService.getData();
    this.myData = this.DATAPORTFOLIO.studie;
    this.myOrganizations = this.DATAPORTFOLIO.organization;
    this.myDegrees = this.DATAPORTFOLIO.degree;


    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.resetForm()
  }
  
  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
  }

  resetForm() {
    this.formData = { 
      id:0, 
      name:"",
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
      degree:{
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
  
  cancelation() {
    this.toggleForm();
  }

  openModalDelete(studie: Studie){
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = studie;
    this.openDeleteModal(studie);
  }


  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delStudie(this.itemParaBorrar).subscribe( {
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.DATAPORTFOLIO.studie = this.myData;
          this.itemParaBorrar = null;
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: " , this.itemParaBorrar);
        },
        complete: () => {console.log("Completada la eliminacion de la Formación");}

      });
    }
  }

  
  addItem(studie: Studie) {
    this.dataService.addStudie(studie).subscribe(  {
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        // v.person = this.DATAPORTFOLIO.id;
        // v.degree = this.formData.degree;
        // v.organization = this.formData.organization;
        this.myData.push(v);
        this.DATAPORTFOLIO.studie = this.myData;
        console.log("Esto estoy guardando en myData", this.myData)
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + studie.name);
      },
      complete: () => console.log("Completado el alta de la Formación")
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
      title: `Hola, está por eliminar uno de los estudios`,
      description: `¿Estás seguro de eliminar "${data.organization.name} (${data.name})" ?`,
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
