import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {Person, Project} from '../../data'


import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario
  // softskill: SoftSkill[] = SOFTSKILL;
  myData: Project[] = [];
  formData: Project;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: Project;
  flagBorrado: boolean = false;
  flagBorrado$: Observable<boolean>;

  user: Person;

  

  constructor( 
    private dataService: DataService,
    
     
    public matDialog: MatDialog,
    private modalService: ModalActionsService,
    ) {
      this.resetForm()
     }

  ngOnInit(): void {
    this.dataService.getProject().subscribe(project =>
      [this.myData = project]
    );
    this.dataService.getGralData().subscribe(data =>
      this.user = data
    ) ;
    // subscribo y me entero si se cambia el status del flag  
    this.flagBorrado$ = this.modalService.getFlagBorrado$();
    this.flagBorrado$.subscribe( (tt)=> {
      console.log(`Se acepto el borrado del item "${this.itemParaBorrar.name}"`);
      this.myData = this.myData.filter( (t) => { return t.id !== this.itemParaBorrar.id } )
    }
    )

    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
    
  }

  resetForm() {
    this.formData = { 
      id:0, 
      name:"", 
      resume:"",
      orderdeploy:0,
      since: 0,
      url:"",
      userId:0 }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }  
  
  cancelation(project: Project) {
    this.toggleForm();
  }

  deleteItem(project: Project){
    this.itemParaBorrar = project;
    this.openDeleteModal(project)
  }

  upDateItem(project: Project) {
    this.dataService.updateProject(project).subscribe();
  }
  
  addItem(project: Project) {
    this.dataService.addProject(project).subscribe( (tt)=> {
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
      name: "delProject",
      title: `Hi ${userId}, está por eliminar uno de los proyectos`,
      description: `¿Estás seguro de eliminar el proyecto "${data.name}" ?`,
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
