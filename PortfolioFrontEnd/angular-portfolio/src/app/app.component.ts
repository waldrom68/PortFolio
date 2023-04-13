import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { FormGroup } from '@angular/forms';


import { BaseCardService, BaseDataService, DataService, ObservableService } from './service/data.service';
import { Card, FullPersonDTO } from './models';

import { Observable, Subscription } from 'rxjs';
import { AdminService } from './service/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'angular-portfolio';

  faTimes = faTimes;

  // PENDIENTE, implementacion parcial, la idea es que muestre progreso o trabajo en 2do plano
  statusWait: boolean = true;

  // Actualmente reloj, se actualiza cada segundo
  currentTime: Date;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  baseDataCard: Card;
  private BaseCardServiceSubscription: Subscription | undefined;


  // PENDIENTE DE LIMPIAR O IMPLEMENTAR, RELACIONADO CON EL PROGRESS BAR
  // valueSubscription: Subscription;
  // progreesValueabc: number;
  // progreesValueabc$?: Observable<number>;
  // llamado?: number

  // showListUsers: boolean = false;
  // showDatos: boolean = false;

  // // codigo probando el modal
  // form: FormGroup;
  // dataFromDialog: any;

  constructor(
    // Inicializamos los servicios del modulo User
    private uiService: UiService,  // defino el servicio para el botton de mostrar form

    private dataService: DataService,
    private baseDataService: BaseDataService,
    private baseCardService: BaseCardService,
    private adminService: AdminService,

    // Este observable, por ahora genera un reloj que se actualiza cada 
    // segundo, la idea es controlar el tiempo de vigencia del token si 
    // ha ingresado como admin
    private observableService: ObservableService,


  ) {
    // Me suscribo a un servicio que mantiene el espejo del pedido http a la DB
    // de los datos completos del portfolio de la persona
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe();
    this.BaseCardServiceSubscription = this.baseCardService.currentBaseCard.subscribe();

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    // Implementacion del reloj
    this.observableService.createObservableService()  // 3
      .subscribe(data => this.currentTime = data);
  }


  ngOnInit() {
    // PENDIENTE, evaluar y analizar, se está llamand a 2 servicios diferentes
    // para obtener los mismos datos (*2)
    // Traigo todos los datos del Portfolio
    this.dataService.getPortFolioData().subscribe({
      next: (currentData) => {

        this.uiService.msgboxOk(['Datos generales del PortFolio obtenidos exitosamente'],);
        this.baseData = currentData;

        this.baseDataService.setCurrentBaseData(currentData);
        this.statusWait = false;
        console.log("Obtenidos los datos exitosamente");


        // this.uiService.msgboxOk(['Datos guardados exitosamente'],);
        // this.uiService.msgboxOk(['Se ha eliminado exitosamentee'] ,);

      },
      error: (e) => {
        // e.status = 0, error del servidor
        // e.status = 400, e.statusText= OK, error en el pedido al servidor
        let msg = new Array()
        msg.push("Se quizo obtener los datos sin exito," + e.message)
        this.statusWait = true;

        console.log("Se quizo obtener los datos sin exito; ")
        switch (e.status) {
          case 0:
            // error en el servidor
            msg.push("Error en el servicio, reintente en unos minutos");
            break
          case 400:
            if (e.statusText.toLowerCase() == "ok") {
              // error en el pedido del servidor
              msg.push("Error en la base de datos", "Reintente en unos minutos");
            }
            break;
        };
        this.uiService.msgboxErr(msg,);

      },
      complete: () => { console.log("Finalizado el proceso de obtener los datos del PortFolio") }
    });

    // Traigo todas las Card del Portfolio
    this.dataService.getPortFolioCard().subscribe({
      next: (currentData) => {

        this.uiService.msgboxOk(['Datos de la estructura del PortFolio obtenidos exitosamente'],);
        // this.detailCard = currentData;

        // Realizo el espejo de los datos completos del portfolio de la persona
        this.baseCardService.setCurrentBaseCard(currentData);

        this.statusWait = true;
        console.log("Obtenidos los datos exitosamente", currentData);

        // this.uiService.msgboxOk(['Datos guardados exitosamente'],);
        // this.uiService.msgboxOk(['Se ha eliminado exitosamentee'] ,);

      },
      error: (e) => {
        // e.status = 0, error del servidor
        // e.status = 400, e.statusText= OK, error en el pedido al servidor
        let msg = new Array()
        msg.push("Se quizo obtener los datos sin exito," + e.message)
        this.statusWait = true;

        console.log("Se quizo obtener los datos sin exito; ")
        switch (e.status) {
          case 0:
            // error en el servidor
            msg.push("Error en el servicio, reintente en unos minutos");
            break
          case 400:
            if (e.statusText.toLowerCase() == "ok") {
              // error en el pedido del servidor
              msg.push("Error en la base de datos", "Reintente en unos minutos");
            }
            break;
        };
        // this.uiService.msgboxErr( msg,); 

      },
      complete: () => { console.log("Finalizado el proceso de obtener los datos de las Card del PortFolio") }
    });
  }


}

