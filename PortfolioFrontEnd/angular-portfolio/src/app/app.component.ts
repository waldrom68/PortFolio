import { Component, InjectionToken, OnInit } from '@angular/core';
import { ProgressValueService, UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatAlertComponent } from './shared/mat-alert/mat-alert.component';
import { MatInputPromptComponent } from './shared/mat-input-prompt/mat-input-prompt.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerComponent } from './shared/mat-datepicker/mat-datepicker.component';
import { BaseDataService, DataService, ObservableService } from './service/data.service';
import { FullPersonDTO, Mensaje } from './models';

import { Observable, Subscription } from 'rxjs';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  title = 'angular-portfolio';

  faTimes = faTimes;
  

  showListUsers: boolean = false;
  showDatos: boolean = false;

  dataFromDialog: any;

  // codigo probando el modal
  form: FormGroup;

  // codigo para probar el datepicker
  // dateMinDate = new Date(2019, 0, 1);
  // dateMaxDate = new Date(moment.now());
  // formDate: FormGroup = new FormGroup({});

  // prueba = new Date(1968, 4, 20)
  // shortdate: FormControl;

  // baseData: FullPersonDTO;
  wait: boolean = true;

  valueSubscription: Subscription;
  progreesValueabc: number;
  progreesValueabc$?: Observable<number>;
  currentTime: Date;
  llamado?: number

 
    constructor(
    // Inicializamos los servicios del modulo User
    private uiService: UiService,  // defino el servicio para el botton de mostrar form
    private dialog: MatDialog,

    // private fb: FormBuilder,

    // private dateAdapter: DateAdapter<Date>,

    // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
    private dataService: DataService,
    private baseDataService: BaseDataService,
    // FIN A LA PRACTICA DE OBSERVER 

    // Este observable, por ahora genera un reloj que se actualiza cada 
    // segundo, la idea es controlar el tiempo de vigencia del token si 
    // ha ingresado como admin
    private observableService: ObservableService,

  
  ) {
        
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );

    // this.dataService.setCurrentValue(0);
    // this.progreesValueabc$ = this.dataService.getCurrentValue$();
    // this.progreesValueabc$.subscribe(valor => this.progreesValueabc = valor);

    this.observableService.createObservableService()  // 3
      .subscribe(data => this.currentTime = data);
  }


  ngOnInit() {
    
    // Traigo todos los datos del Portfolio

    this.dataService.getPortFolioData().subscribe({
      next: (currentData) => {
        console.log("Datos obtenidos exitosamente",currentData);

        this.baseDataService.setCurrentBaseData(currentData);
        this.wait = false;

      },
      error: (e) => {
        // e.status = 0, error del servidor
        // e.status = 400, e.statusText= OK, error en el pedido al servidor
        this.wait = true;
        alert("Response Error (" + e.status + ") en iniciar.sesion.component" + "\n" + e.message);
        console.log("Se quizo obtener los datos sin exito; ", e)
      },
      complete: () => { console.log("Finalizado el proceso de obtener los datos del PortFolio") }
    });

    
    // prueba del datepicker
    // this.dateAdapter.setLocale('es');
    // this.formDate = this.fb.group({
    //   date: new FormControl(new Date()),
    //   shortdate: new FormControl(this.prueba),
    // });

  }

  // Mensaje de alerta.
  alertDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-warn";

    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // dialogConfig.maxWidth = '700px';
    dialogConfig.data = new Mensaje("ok",
      ['Todo bien, estoy confirmandolo'], 1500)


    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }

}

  // Pruebas del DatePicker
  // onSubmit(): void {
  //   console.log("Hice click en el datepicker", this.formDate)
  // }

  // onDateUpdate(date: FormControl) {
  //   console.log("INPUT:", date.value._i == date.value._d);
  //   this.formDate.value.shortdate = date.value._d;

  // }

  // Eventos recibidos desde: add-button-user.component.html
  // 
  // toggleListUser(value: any) {
  //   // Recibo el metodo y lo relaciono con el uiService.

  //   this.showListUsers = !this.showListUsers;
  //   this.uiService.toggleComponent(value)
  // }

  // toggleDatos(value: any) {
  //   // Recibo el metodo y lo relaciono con el uiService.
  //   this.showDatos = !this.showDatos;
  //   this.uiService.toggleComponent(value)
  // }





  // showPrompt(): void {
  //   const dialogRef = this.dialog.open(MatInputPromptComponent,
  //     {
  //       width: '100%', height: '400px',
  //       disableClose: true,
  //       restoreFocus: true,
  //       direction: "rtl",
  //       // Puedo pasar los datos necesarios del formulario aqui, con el diccionario
  //       // data: {message:string, form: formGroup}, sino lo puedo crear en el .ts 
  //       // del componente que lo renderiza.
  //       // +info en https://edupala.com/how-to-implement-angular-material-dialog/
  //       data: {
  //         message: "Aquí va al string",
  //         form: this.form,
  //       },
  //     });


  //   dialogRef.afterClosed().subscribe((data) => {

  //     this.dataFromDialog = data.form;
  //     if (data.clicked === 'submit') {
  //       console.log('Sumbit button clicked, mostrando datos del formulario:', data)
  //       console.log("El formData", this.form)
  //     }
  //   });
  // }

