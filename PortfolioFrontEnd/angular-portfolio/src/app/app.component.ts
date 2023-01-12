import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta
import { MatAlertComponent } from './shared/mat-alert/mat-alert.component';



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
  

constructor(
  // Inicializamos los servicios del modulo User
        private uiService:UiService,  // defino el servicio para el botton de mostrar form
        private dialog: MatDialog
  ) { }


  ngOnInit() {

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

  alertDialog() {
    const dialogRef = this.dialog.open(MatAlertComponent, {
      data: {
        message: 'Hello World from app.component.ts',
      },
    });
  }

}