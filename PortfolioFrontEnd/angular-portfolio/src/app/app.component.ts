import { Component } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from './shared/message-box/message-box.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {

  title = 'angular-portfolio';

  faTimes = faTimes;

  showListUsers: boolean = false;
  showDatos: boolean = false;

  prueba:boolean = false
  

constructor(
  // Inicializamos los servicios del modulo User
        private uiService:UiService,  // defino el servicio para el botton de mostrar form
        public matDialog: MatDialog,
  ) { }


  ngOnInit() {

  }

  openLogoutModal() {
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
      name: "logout",
      title: `Hi ${userId}, Are you sure you want to logout?`,
      description: "Pretend this is a convincing argument on why you shouldn't logout :)",
      // por defecto mostrararía Aceptar
      actionButtonText: "Logout",
      // por defecto mostraría Cancelar
      cancelActionText: "lechazo",
      // por defecto utilizará el definido en style.css "mat-dialog-container#modal-component"
      backColor: "darkgrey",

      // atributos exclusivos para este message-box
      userId: userId
    }

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(MessageBoxComponent, dialogConfig);
  }

  openLogoutModal2() {
    const productId = "prod01";
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "deleteProduct",
      title: "Are you sure you want to delete this product?",
      description: `If you continue, the product with ID = "${productId}" will be deleted.`,
      // por defecto mostrararía Aceptar
      actionButtonText: "",
      // por defecto mostraría Cancelar
      cancelActionText: "",
      // por defecto utilizará el definido en style.css "mat-dialog-container#modal-component"
      backColor: "",

      // atributos exclusivos para este message-box
      productId: productId
    }

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(MessageBoxComponent, dialogConfig);
}


// Eventos recibidos desde: add-button-user.component.html
  // 
  toggleListUser(value:any) {
    // Recibo el metodo y lo relaciono con el uiService.

    this.showListUsers = !this.showListUsers;
    this.uiService.toggleComponent(value)
  }

  toggleDatos(value:any) {
    // Recibo el metodo y lo relaciono con el uiService.
    this.showDatos = !this.showDatos;
    this.uiService.toggleComponent(value)
  }


}