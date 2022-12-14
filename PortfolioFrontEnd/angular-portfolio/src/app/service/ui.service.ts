import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cards, PortfolioInit} from '../data';

import { CARDS, PORTFOLIOINIT } from '../mock-data';

import { DataService } from './data.service';




@Injectable({
  providedIn: 'root'
}) 

export class UiService {
  private showComponent: boolean = false;
  private subjectShowComponent = new Subject<any>();

  private portfolioinit:PortfolioInit;
  
  
  private statusCards:boolean = true;  // Indica si se muestran las Cards en el main
  private cards: Cards[];  // Contiene los datos para Cards/etiquetas que levante de mock-data
   
  private visited:string="";  // Nombre de la tarjeta sobre la cual hice click -PENDIENTE
  
  portfolioinit2:PortfolioInit;

  constructor(
    private dataService: DataService,
   ) {
    this.cards = CARDS
    this.portfolioinit = PORTFOLIOINIT;
   }




  // Pendiente, esto debe vincularse con el logueo
  getUserLoggin() {
     return this.portfolioinit2.userId
  }
    
    // Metodos para el manejo del layout de las tarjetas
  getCards() {
    return this.cards;
  }

  getStatusCards() {
    return this.statusCards
  }

  getLastVisited() {
    console.log(this.visited)
    return this.visited
  }

  toggleDetalles(mensaje:string="") {
    // console.log("En el servicio recibo este dato: ", mensaje)
      this.cards.forEach(element => {
        if (element.name === mensaje) {
          element.status = true;
        } else {
          element.status = false;
        }
      });
      // this.visited = mensaje
      // console.log("En el servicio, resultado del proceso", this.cards)
  }

  toggleStatusCards(){
    // console.log("En servicio el statusCards esta en", this.statusCards)
    this.statusCards = !this.statusCards;
  }


  
  // -----------------------------------------------------
  // PENDIENTE DE ELIMINAR ESTOS METODOS. REVISAR PREVIAMENTE
  // Metodos que existian antes del uso del servicio para las Tarjetas
  toggleComponent(value:any): void {
    // console.log("usando el servicio de ver/no ver componente", value)
    this.showComponent = !this.showComponent
  }

  onToggleComponet(value:any): Observable<any> {
    // console.log("estoy en el metodo onToggle del uiService", value)
    return this.subjectShowComponent.asObservable();
  }

}