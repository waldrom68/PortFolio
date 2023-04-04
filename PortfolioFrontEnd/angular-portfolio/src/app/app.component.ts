import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { FormGroup } from '@angular/forms';


import { BaseDataService, DataService, ObservableService } from './service/data.service';
import { FullPersonDTO } from './models';

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

  wait: boolean = true;

  valueSubscription: Subscription;
  progreesValueabc: number;
  progreesValueabc$?: Observable<number>;
  currentTime: Date;
  llamado?: number

 
    constructor(
    // Inicializamos los servicios del modulo User
    private uiService: UiService,  // defino el servicio para el botton de mostrar form
  
    private dataService: DataService,
    private baseDataService: BaseDataService,
  

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


    this.observableService.createObservableService()  // 3
      .subscribe(data => this.currentTime = data);
  }


  ngOnInit() {

    // Traigo todos los datos del Portfolio
    this.dataService.getPortFolioData().subscribe({
      next: (currentData) => {

        this.uiService.msgboxOk( ['Datos obtenidos exitosamente'],);

        this.baseDataService.setCurrentBaseData(currentData);
        this.wait = false;
        console.log("Obtenidos los datos exitosamente");
        

      },
      error: (e) => {
        // e.status = 0, error del servidor
        // e.status = 400, e.statusText= OK, error en el pedido al servidor
        let msg = new Array()
        msg.push("Se quizo obtener los datos sin exito," + e.message)
        this.wait = true;
       
        console.log("Se quizo obtener los datos sin exito; ")
        switch (e.status) {
          case 0:
            // error en el servidor
            msg.push("Error en el servicio, reintente en unos minutos");
            break
          case 400:
            if (e.statusText.toLowerCase() == "ok" ) {
              // error en el pedido del servidor
              msg.push("Error en la base de datos","Reintente en unos minutos");
            }
            break;
        };
        this.uiService.msgboxOk( msg,); 
        
      },
      complete: () => { console.log("Finalizado el proceso de obtener los datos del PortFolio") }
    });


  }


}

