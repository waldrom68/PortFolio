import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {Person, Studie, Organization, Degree, FullPersonDTO} from '../../models'


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-datos-formacion',
  templateUrl: './datos-formacion.component.html',
  styleUrls: ['./datos-formacion.component.css']
})
export class DatosFormacionComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;
  showForm: boolean = false;  // flag para mostrar o no el formulario

  // softskill: SoftSkill[] = SOFTSKILL;
  myData: Studie[] = [];
  formData: Studie;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: Studie;
  flagBorrado: boolean = false;
  flagBorrado$: Observable<boolean>;

  user: FullPersonDTO;
  myOrganizations: Organization[];
  myDegrees: Degree[];

 
  constructor( 
    private dataService: DataService,

    public matDialog: MatDialog,
    private modalService: ModalActionsService,
    ) {
      // this.dataService.getGralData().subscribe(data =>
      //   this.user = data
      //   ) ;
        this.dataService.getOrganization().subscribe(data =>
          this.myOrganizations = data
    
        );
        this.dataService.getDegree().subscribe(data =>
          this.myDegrees = data
        );
        this.dataService.getStudie().subscribe(data =>
          this.myData = data
        );
      this.resetForm()
    }


  ngOnInit(): void {

    // subscribo y me entero si se cambia el status del flag  
    this.flagBorrado$ = this.modalService.getFlagBorrado$();
    this.flagBorrado$.subscribe( (tt)=> {
      console.log(`Se acepto el borrado del item "${this.itemParaBorrar.organization}"`);
      this.myData = this.myData.filter( (t) => { return t.id !== this.itemParaBorrar.id } )
    }
    )

    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin();

    //  console.log(this.user.id)

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
  delete(studie: Studie) {
    // Este codigo acualiza el array Person para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delStudie(studie).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
        this.myData = this.myData.filter( (t) => { return t.id !== studie.id } )
      }
      );

  }



  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }  
  
  cancelation(studie: Studie) {
    this.toggleForm();
  }

  deleteItem(studie: Studie){
    this.itemParaBorrar = studie;
    this.openDeleteModal(studie)
  }

  upDateItem(studie: Studie) {
    this.dataService.updateStudie(studie).subscribe();
  }
  
  addItem(studie: Studie) {
    this.dataService.addStudie(studie).subscribe( (tt)=> {
      this.myData.push( tt );
      this.toggleForm();
      this.resetForm();
    }
    );
    // this.resetForm();

  }

  openDeleteModal(data:any) {
    // Acciones definidas en el modal-action.service.ts
    // PENDIENTE, RECUPERAR EL VALOR DE USER NAME PARA PASARLO AL MSG.
    const userId = this.user.name;
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "delStudie",
      title: `Hi ${userId}, está por eliminar uno de los estudios`,
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

  }
}

