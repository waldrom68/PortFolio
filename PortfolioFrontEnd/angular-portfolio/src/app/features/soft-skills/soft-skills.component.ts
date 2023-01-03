import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {Person, SoftSkill} from '../../data'
// import {SOFTSKILL} from '../../../mock-data'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';


declare function updateProgress(): void;
@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {

  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario
  // softskill: SoftSkill[] = SOFTSKILL;
  myData: SoftSkill[] = [];
  formData: SoftSkill;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: SoftSkill;
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
    this.dataService.getSoftSkill().subscribe(skills =>
      [this.myData = skills]
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
    this.formData = { id:0, name:"", assessment:0, orderdeploy:0, person:0 }
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }  
  
  cancelation(oftskill: SoftSkill) {
    this.toggleForm();
  }

  deleteItem(softskill: SoftSkill){
    this.itemParaBorrar = softskill;
    this.openDeleteModal(softskill)
  }

  upDateItem(softskill: SoftSkill) {
    this.dataService.updateSoftSkill(softskill).subscribe();
  }
  
  addItem(softskill: SoftSkill) {
    this.dataService.addSoftskill(softskill).subscribe( (tt)=> {
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
      name: "delSoftSkill",
      title: `Hi ${userId}, está por eliminar una de las habilidades personales`,
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

  }
  
  // ngAfterViewInit(){
  //   console.log("se termino ngAfterViewInit")
  //   updateProgress();
  // }

  ngAfterViewChecked() {
    console.log("se termino ngAfterViewChecked")
    updateProgress();
  }

  ngAfterContentChecked() {
    console.log("se termino ngAfterContentChecked")
    updateProgress();
  }
}
