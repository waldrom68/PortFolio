import { Component, Input, OnInit } from '@angular/core';
import { Renderer2, AfterViewInit } from '@angular/core';


import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { FullPersonDTO, Person, Usuario } from 'src/app/models';

import { DataService } from 'src/app/service/data.service';
import { TokenService } from 'src/app/service/token.service';

// import { Cards } from 'src/app/data';

import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  faTimes = faTimes;
  // Variable que controla si se muestran las tarjetas, si muestra detalle,
  // las tarjetas se deben ocultar, 
  //  son pasadas en el tag de app asi: [detailCard]="CardsGroup1"
  //  son recibidas en otros componentes via @Input() detailCard:Cards [];
  detailCards:any;  // 
  //  son registrada en el tag de app asi: (toggleCards)="toggleCards()"
  //  son registradas en el componente hijo asi: @Output() toggleCards = new EventEmitter();
  //                                              toggleContenedor(dato:string) {
  //                                                  this.toggleCards.emit();
  statusCards: boolean;  // Muestra las Cards/Etiquetas
  
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;
  
  // Separo las etiquetas/cards según su grupo
  // detailCards filtrandolo segun atributo "group"
  CardsGroup1: any;
  labelGroup1: string;
  CardsGroup2: any;
  labelGroup2: string;
  separador = [" - "];

  element: object;
  fragment:string = 'Init';

  // myData: Person;
  // testData: any;
    
  DATAPORTFOLIO: FullPersonDTO;

  // Inyectando servicios en el contructor
  constructor( 
    private miServicio: UiService,
    private dataService: DataService,
    private tokenService: TokenService,
    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 
  

    ) { 
    // Traigo todos los datos del Portfolio
    // this.dataService.getGralData().subscribe(user => {
    //     this.myData = user,
    //     this.dataService.setUSER(user)
    //   });
    }

  ngOnInit(
    
    
  ): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)

    // NUEVA IMPLEMENTACION TRAS LA INCORPORACION DEL AUTHENTICATION
    this.dataService.getPortFolioData().subscribe(
      gralData => {
      this.DATAPORTFOLIO = gralData;
      this.dataService.changeGralData(gralData);

    } )
    , (err: string) => console.error('Observer got an error: ' + err)
    , () => console.log('Observer got a complete notification');
  

    // AQUI DEBO INICIALIZAR EL FLAG IS ADMIN DE ACUERDO SI EL TOKEN ES VALIDO COMO ADMINISTRADOR
    if (this.tokenService.isValidAdmin()) {
      this.dataService.hasCredentials(true);
    }



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
