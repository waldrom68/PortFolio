import { Component, Input, OnInit } from '@angular/core';
import { Renderer2, AfterViewInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

// import { Cards } from 'src/app/data';

import { UiService } from 'src/app/service/ui.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  faTimes = faTimes;
  // Variable que controla si se muestrasn las tarjetas, si muestra detalle,
  // las tarjetas se deben ocultar
  statusCards: boolean;  // Muestra las Cards/Etiquetas
  detailCards:any;  // 

  // Separo las etiquetas/cards según su grupo
  // detailCards filtrandolo segun atributo "group"
  CardsGroup1: any;
  labelGroup1: string;
  CardsGroup2: any;
  labelGroup2: string;
  separador = [" - "];

  element: object;
  fragment:string = 'Init';
  
  constructor( private miServicio: UiService,
    private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.detailCards = this.miServicio.getCards();
    this.statusCards = this.miServicio.getStatusCards()

    // Separo los grupos
    this.CardsGroup1 = this.detailCards.filter(function (elem:any)
        { return elem.group == 1; }  ) 
    this.CardsGroup2 = this.detailCards.filter(function (elem:any)
        { return elem.group == 2; }  )

    // Armo etiqueta de cada grupo:
    console.log(this.CardsGroup1)

    this.labelGroup1 = this.CardsGroup1.map( (valor:any) => {
        return valor.name;
      }).join(this.separador)

      this.labelGroup2 = this.CardsGroup2.map( (valor:any) => {
        return valor.name;
      }).join(this.separador)

    console.log(this.labelGroup2)
    }

  ngAfterViewInit(): void {
    let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }



    cerrarDetalles() {
      console.log("Recibo en main, instruccion de cerrar detalles");
      this.miServicio.ocultarDetalles();
      this.miServicio.toggleCards();
      this.statusCards = this.miServicio.getStatusCards()
      console.log("Es estado del statusCards es", this.statusCards)
    }

    toggleCards() {
      console.log("Ejecusion de toggleCards en main.component")
      this.miServicio.toggleCards();
      this.miServicio.ocultarDetalles();
      this.statusCards = this.miServicio.getStatusCards()
      console.log("Es estado del statusCards es", this.statusCards)
      // this.CardsGroup1 = this.detailCards.filter(function (elem:any)
      //   { return elem.group == 1; }  ) 
    }

}
