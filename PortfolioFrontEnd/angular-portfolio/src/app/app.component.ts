import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { BaseCardService, BaseDataService, DataService, ObservableService } from './service/data.service';
import { Card, FullPersonDTO } from './models';

import { Subscription } from 'rxjs';
import { AdminService } from './service/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  faTimes = faTimes;

  // PENDIENTE, implementacion parcial, la idea es que muestre progreso en los GETs
  //  y trabajo en 2do plano POST, PUT
  statusReady: boolean = false;
  statusWait: boolean[] = [true, true];

  statusError: boolean = false;

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


  constructor(
    // Inicializamos los servicios del modulo User
    private uiService: UiService,  // manejo de las notificaciones

    private dataService: DataService,  // manejo de la persistencia
    private adminService: AdminService,  // manejo del estado para el ROLE_ADMIN
    
    private baseDataService: BaseDataService,  // Datos completos para la persona del Portfolio
    private baseCardService: BaseCardService,  // Layout

    // Este observable, por ahora genera un reloj que se actualiza cada 
    // segundo, la idea es controlar el tiempo de vigencia del token si 
    // ha ingresado como admin
    private observableService: ObservableService,


  ) {
    // Me suscribo a los servicios que mantienen el espejo de los pedidos http a la DB
    //
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

    this.getAllDataLayout();
    this.getAllDataPerson();

  }

  getAllDataLayout() {
    // Traigo todas las Card para el layout del Portfolio
    this.dataService.getPortFolioCard().subscribe({
      next: (currentData) => {

        // Realizo el espejo de los datos completos del portfolio de la persona
        this.baseCardService.setCurrentBaseCard(currentData);

        console.log("Obtenidos los datos para el layout exitosamente");

      },

      error: (e) => {
        // e.status = 0, error del servidor
        // e.status = 400, e.statusText= OK, error en el pedido al servidor
        let msg = new Array()
        msg.push("Se quizo obtener los datos sin exito," + e.message)
        this.statusError = true;

        console.log("Se quizo obtener los datos para el layout sin exito; ")
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

      },

      complete: () => {
        console.log("Finalizado el proceso de obtener los datos de las Card del PortFolio");
        this.statusWait[1] = false;
        this.statusReady = this.statusWait.every(value => !value);

        if (this.statusReady) {
          this.uiService.msgboxOk(['Datos del PortFolio obtenidos exitosamente'],);
        }
      }
    });
  }

  getAllDataPerson() {
    // Traigo todos los datos de la persona para el Portfolio
    this.dataService.getPortFolioData().subscribe({
      next: (currentData) => {
        this.baseData = currentData;

        this.baseDataService.setCurrentBaseData(currentData);

        console.log("Obtenidos los datos del portfolio exitosamente");
      },

      error: (e) => {
        // e.status = 0, error del servidor
        // e.status = 400, e.statusText= OK, error en el pedido al servidor
        let msg = new Array()
        msg.push("Se quizo obtener los datos sin exito," + e.message)
        this.statusError = true;

        console.log("Se quizo obtener los datos del portfolio sin exito; ")
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

      complete: () => {
        console.log("Finalizado el proceso de obtener los datos del PortFolio");
        this.statusWait[0] = false;
        this.statusReady = this.statusWait.every(value => !value);

        if (this.statusReady) {
          this.uiService.msgboxOk(['Datos obtenidos exitosamente'],);
        }

      }
    });

  }

}

