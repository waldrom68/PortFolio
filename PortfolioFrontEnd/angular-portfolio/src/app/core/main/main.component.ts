import { Component, Input, OnInit } from '@angular/core';
import { Renderer2, AfterViewInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Person, Usuario } from 'src/app/data';
import { DataService } from 'src/app/service/data.service';

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

  public user: Usuario;
   
  constructor( 
    private miServicio: UiService,
    private renderer: Renderer2,

    ) { 

    }



  ngOnInit(): void {
    this.detailCards = this.miServicio.getCards();
    this.statusCards = this.miServicio.getStatusCards()
    

    // Separo los grupos
    this.CardsGroup1 = this.detailCards.filter(function (elem:any)
        { return elem.group == 1; }  ) 
    this.CardsGroup2 = this.detailCards.filter(function (elem:any)
        { return elem.group == 2; }  )

    // Armo etiqueta de cada grupo:
    this.labelGroup1 = this.CardsGroup1.map( (valor:any) => {
        return valor.name;
      }).join(this.separador)

    this.labelGroup2 = this.CardsGroup2.map( (valor:any) => {
        return valor.name;
      }).join(this.separador)

    }

  ngAfterViewInit(): void {
    let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }



    toggleCards() {
      // PENDIENTE, DEBO TOGGLEAR LOS ARRAY PARCIALES, NO EL DE ORIGEN
      this.miServicio.toggleDetalles();
      this.miServicio.toggleStatusCards();
      this.statusCards = this.miServicio.getStatusCards()
    }


}
