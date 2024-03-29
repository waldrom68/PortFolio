import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Card, PortfolioInit} from '../models';

import { CARDS, PORTFOLIOINIT } from '../../assets/data/mock-data';

import { DataService } from './data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from '../shared/mat-alert/mat-alert.component';




@Injectable({
  providedIn: 'root'
}) 
export class UiService {
  private showComponent: boolean = false;
  private subjectShowComponent = new Subject<any>();

  // private portfolioinit:PortfolioInit;
  
  
  private statusCards:boolean = true;  // Indica si se muestran las Cards en el main
  private cards: Card[];  // Contiene los datos para Cards/etiquetas que levante de mock-data
  cards2: Card;
  private visited:string="";  // Nombre de la tarjeta sobre la cual hice click -PENDIENTE
  
  // portfolioinit2:PortfolioInit;

  private flagAction: boolean=true;
  private flagAction$ = new Subject<boolean>();


  constructor(
    private dataService: DataService,
    private dialog: MatDialog,

   ) {
  //   // this.cards = CARDS;
  //   this.dataService.getPortFolioCard().subscribe(
  //     currentCard => {
  //       console.log("Recibiendo esto->",currentCard);
        
  //       this.cards2 = currentCard;
  //     }
  //   )
  //   // this.portfolioinit = PORTFOLIOINIT;
   }


  // // Pendiente, esto debe vincularse con el logueo
  // // getUserLoggin() {
  // //    return this.portfolioinit2.userId
  // // }
    
  //   // Metodos para el manejo del layout de las tarjetas
  // getCards() {
  //   // console.log("Estas son las Cards que tengo en mock-data", this.cards);
  //   console.log("Estas son las Cards que traigo de la DB", this.cards2);
    
  //   return this.cards2;
  // }

  // getStatusCards() {
  //   console.log(this.statusCards);
    
  //   return this.statusCards
  // }

  // getLastVisited() {
  //   console.log(this.visited)
  //   return this.visited
  // }

  toggleDetalles(mensaje:string="") {
    console.log("En el servicio recibo este dato: ", mensaje)
      console.log("en el servicio, recibo para el proceso", this.cards2);
      
      // this.cards.forEach(element => {
      //   if (element.name === mensaje) {
      //     element.status = true;
      //   } else {
      //     element.status = false;
      //   }
      // });
      this.visited = mensaje
      console.log("En el servicio, resultado del proceso", this.cards2)
  }

  // toggleStatusCards(){
  //   // console.log("En servicio el statusCards esta en", this.statusCards)
  //   this.statusCards = !this.statusCards;
  // }



  
  // // -----------------------------------------------------
  // // PENDIENTE DE ELIMINAR ESTOS METODOS. REVISAR PREVIAMENTE
  // // Metodos que existian antes del uso del servicio para las Tarjetas
  // toggleComponent(value:any): void {
  //   // console.log("usando el servicio de ver/no ver componente", value)
  //   this.showComponent = !this.showComponent
  // }

  onToggleComponet(value:any): Observable<any> {
    // console.log("estoy en el metodo onToggle del uiService", value)
    return this.subjectShowComponent.asObservable();
  }


  msgboxOk(msg?:string[]) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-warn";
    dialogConfig.data = {
      message: msg ? msg : ['Registración realizada exitosamente'],
      type: 'ok',
      timer: 1800
    };
    
    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }
  
  msgboxErr(msg?:string[]) {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-warn";
    dialogConfig.data = {
      message: msg ? msg : ['Error ! '],
      type: 'error',
    };
    
    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    // dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));

  }

}

@Injectable({
  providedIn: 'root'
})
export class ProgressValueService {
  private progressValueSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  public readonly currentProgressValue: Observable<number> = this.progressValueSubject.asObservable();
  public prueba: number;
  constructor() {

    
    // this.setCurrentProgressValue(0);
   }
   get Prueba() {
    return this.prueba;
  }
  
  PruebaUp(value:number) {
    console.log("RECIBIENDO ESTO", value);
    
    this.prueba = value;
  }
  setCurrentProgressValue(currentData: number): void {
    this.progressValueSubject.next(currentData);
  }
}

// Nueva IMPLEMENTACION
@Injectable({
  providedIn: 'root'
})
export class FormService {
  // Este servicio mantiene el control si se abren formularios que no están
  // contenidos dentro de un modal. La idea es que sólo existe un form visible
  // para el usuario
  private currentOpenFormSubject: BehaviorSubject<number> = new BehaviorSubject({} as number);
  public readonly currentOpenForm: Observable<number> = this.currentOpenFormSubject.asObservable();

  constructor() { }

  setCurrentForm(current: number): void {
    this.currentOpenFormSubject.next( current);

  }
}
