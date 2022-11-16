import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cards } from '../data';
import { CARDS } from '../mock-data';




@Injectable({
  providedIn: 'root'
}) 

export class UiService {
  private showComponent: boolean = false;
  private subjectShowComponent = new Subject<any>();




  private cards: Cards[];




  constructor( ) {
    this.cards = CARDS;
   }

  // Metodos para el manejo del layout de las tarjetas
  getStatus() {
    return this.cards;
  }

  muestraDetalles(mensaje:string) {
    // console.log("En el servicio recibo este dato: ", mensaje)
      this.cards.forEach(element => {
        if (element.name === mensaje) {
          element.status = true;
        } else {
          element.status = false;
        }
      });
      console.log("resultado del proceso", this.cards)
  }

  ocultarDetalles() {
    this.cards.forEach(element => {
        element.status = false;
    });

  }
// -----------------------------------------------------


  // Metodos que existian antes del uso del servicio para las Tarjetas
  toggleComponent(value:any): void {
    console.log("usando el servicio de ver/no ver componente", value)
    this.showComponent = !this.showComponent
  }

  onToggleComponet(value:any): Observable<any> {
    console.log("estoy en el metodo onToggle del uiService", value)
    return this.subjectShowComponent.asObservable();
  }

}