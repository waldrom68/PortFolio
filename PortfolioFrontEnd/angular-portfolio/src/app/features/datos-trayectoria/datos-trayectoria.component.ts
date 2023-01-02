import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {Person, LaboralCareer, Organization, RolePosition} from '../../data'


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';
import { USERS } from 'src/app/mock-data';

// import {WORKEXPERIENCE} from '../../../mock-data'

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;
  showForm: boolean = false;  // flag para mostrar o no el formulario

  // softskill: SoftSkill[] = SOFTSKILL;
  myData: LaboralCareer[] = [];
  formData: LaboralCareer;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: LaboralCareer;
  flagBorrado: boolean = false;
  flagBorrado$: Observable<boolean>;

  user: Person;
  myOrganization: Organization;
  myRoleposition: RolePosition;

  

  constructor( 
    private dataService: DataService, 

    public matDialog: MatDialog,
    private modalService: ModalActionsService,
    ) { }
  

  ngOnInit(): void {
    this.dataService.getLaboralCareer().subscribe(career =>
      [this.myData = career]
    );

    this.dataService.getGralData().subscribe(data =>
      this.user = data
    ) ;
    // subscribo y me entero si se cambia el status del flag  
    this.flagBorrado$ = this.modalService.getFlagBorrado$();
    this.flagBorrado$.subscribe( (tt)=> {
      console.log(`Se acepto el borrado del item "${this.itemParaBorrar.organization}"`);
      this.myData = this.myData.filter( (t) => { return t.id !== this.itemParaBorrar.id } )
    }
    )

    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()

  }

  delete(career: LaboralCareer) {
    // Este codigo acualiza el array Person para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delLaboralCareers(career).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
        this.myData = this.myData.filter( (t) => { return t.id !== career.id } )
      }
    );
  }

  resetForm() {
    this.formData = { 
      id:0, 
      resume:"",
      startDate: new Date(),
      endDate: new Date(),
      orderdeploy:0,
      status:true,
      organization: this.myOrganization,
      roleposition:this.myRoleposition,
      person: this.user.id }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }  
  
  cancelation(career: LaboralCareer) {
    this.toggleForm();
  }

  deleteItem(career: LaboralCareer){
    this.itemParaBorrar = career;
    this.openDeleteModal(career)
  }

  upDateItem(career: LaboralCareer) {
    this.dataService.updateLaboralCareer(career).subscribe();
  }
  
  addItem(career: LaboralCareer) {
    this.dataService.addLaboralCareer(career).subscribe( (tt)=> {
      this.myData.push( tt );
      this.toggleForm();
    }
    );
    this.resetForm();

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
      name: "delLaboralCareer",
      title: `Hi ${userId}, está por eliminar uno de los trabajos`,
      description: `¿Estás seguro de eliminar el trabajo en "${data.organization}" ?`,
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
