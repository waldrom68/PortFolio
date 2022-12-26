import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { Interest } from '../../data'
// import {INTERESES} from '../../../mock-data'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {


  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  // intereses: Intereses[] = INTERESES;
  myData: Interest[] = [];
  formData: Interest;  // instancia vacia, para cuando se solicite un alta
  
  faPlusCircle = faPlusCircle;
  faPen = faPen;

  showForm: boolean = false;  // flag para mostrar o no el formulario
  // ocultarAcciones: boolean = false;
  
  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: Interest;
  flagBorrado: boolean = false;
  flagBorrado$: Observable<boolean>;

 
  constructor( 
    private dataService: DataService,
    
    public matDialog: MatDialog,
    private modalService: ModalActionsService,
    ) {
      this.formData = { id:0, name:"", orderdeploy:0, userId:0 }
     }
    
  ngOnInit(): void {
    this.dataService.getInterests().subscribe(interest =>
      [this.myData = interest]
    );

    // if (this.flagUserAdmin) {
    //   this.showBtnAction = true 
    // } else {
    //   this.showBtnAction = false
    // }

    // subscribo y me entero si se cambia el estatus del flag  
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


  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction
  }


  cancelation(interest: Interest) {
    this.toggleForm();
  }

  deleteItem(interest: Interest){
    this.itemParaBorrar = interest;
    this.openDeleteModal(interest)
  }

  upDateInterest(interest: Interest) {
    this.dataService.updateInterest(interest).subscribe();
  }

  addInterest(interest: Interest) {
    this.dataService.addInterests(interest).subscribe( (tt)=> {
        this.myData.push( tt );
        this.toggleForm();
      }
    );
  }

  openDeleteModal(data:any) {
    // Acciones definidas en el modal-action.service.ts
    const userId = "user01";
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "delInterest",
      title: `Hi ${userId}, está por eliminiar uno de los intereses ?`,
      description: `Esto significa que será eliminado "${data.name}", y ya no se podrá acceder a sus datos, ¿está seguro?`,
      // por defecto mostrararía Aceptar
      actionButtonText: "Eliminar",
      // por defecto mostraría Cancelar
      cancelActionText: "",
      // por defecto utilizará el definido en style.css "mat-dialog-container#modal-component"
      backColor: "",

      // atributos exclusivos para este message-box
      data: data,
    }

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(MessageBoxComponent, dialogConfig);

  }

}
