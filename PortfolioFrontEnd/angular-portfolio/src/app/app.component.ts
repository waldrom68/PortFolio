import { Component } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatAlertComponent } from './shared/mat-alert/mat-alert.component';
import { MatInputPromptComponent } from './shared/mat-input-prompt/mat-input-prompt.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  dataFromDialog : any;
  
  // codigo probando el modal
  form: FormGroup; 



constructor(
  // Inicializamos los servicios del modulo User
        private uiService:UiService,  // defino el servicio para el botton de mostrar form
        private dialog: MatDialog,

        private fb: FormBuilder,
  ) {

    this.form = this.fb.group(
      {
        name: ['Origen datos', Validators.required],
        address: ['componente de llamada', Validators.required],
        country: ['']
      }
    )

   }


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
      width: '100%', height: 'auto',
      data: {
        message: 'Aqui va el texto desde donde se llama al modal',
      },
    });
  }


  showPrompt(): void {
    const dialogRef = this.dialog.open(MatInputPromptComponent,
      { 
        width: '100%', height: '400px',
        disableClose: true,
        restoreFocus: true,
        // Puedo pasar los datos necesarios del formulario aqui, con el diccionario
        // data: {message:string, form: formGroup}, sino lo puedo crear en el .ts 
        // del componente que lo renderiza.
        // +info en https://edupala.com/how-to-implement-angular-material-dialog/
        data: { 
            message: "Aquí va al string desde donde se abre el modal",
            form: this.form,
          },
      });


    dialogRef.afterClosed().subscribe((data) => {

      this.dataFromDialog = data.form;
      if (data.clicked === 'submit') {
        console.log('Sumbit button clicked, mostrando datos del formulario:', data)
        console.log("El formData", this.form)
      }
    });
  }

}