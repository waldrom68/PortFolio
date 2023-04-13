import { Component, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { now } from 'moment';
import { Subscription } from 'rxjs';
import { Card, FullPersonDTO } from 'src/app/models';

import { BaseCardService, BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { TokenService } from 'src/app/service/token.service';
import { UiService, FormService } from 'src/app/service/ui.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faPen = faPen;
  // Variable que controla si se muestran las tarjetas, si muestra detalle,
  // las tarjetas se deben ocultar, 
  //  son pasadas en el tag de app asi: [detailCard]="CardsGroup1"
  //  son recibidas en otros componentes via @Input() detailCard:Cards [];

  detailCards: any;  // 
  //  son registrada en el tag de app asi: (toggleCards)="toggleCards()"
  //  son registradas en el componente hijo asi: @Output() toggleCards = new EventEmitter();
  //                                              toggleContenedor(dato:string) {
  //                                                  this.toggleCards.emit();
  statusCards: boolean;  // Muestra las Cards/Etiquetas




  // Separo las etiquetas/cards según su grupo
  // detailCards filtrandolo segun atributo "grupo"
  CardsGroup1: any;
  labelGroup1: string;
  CardsGroup2: any;
  labelGroup2: string;
  separador = [" - "];

  element: object;
  fragment: string = 'Init';
  // wait: boolean = true;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  // baseCard: Card;
  // private BaseCardServiceSubscription: Subscription | undefined;
  
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  // nueva logica para el acceso a la info tras un click sobre el Card
  showCards: boolean = true;  
  showBtnAction: boolean = true;  // inician visibles
  targetCardId: number = 0;

  // Inyectando servicios en el contructor
  constructor(
    private dataService: DataService,
    // PENDIENTE MODO PRUEBA
    private baseDataService: BaseDataService,
    // private baseCardService: BaseCardService,
    private adminService: AdminService,
    // FIN MODO PRUEBA

    private uiService: UiService,
    private tokenService: TokenService,
    private formService: FormService,

    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 


  ) {

  }

  ngOnInit(): void {

    // console.log(formatDate(now(), 'yyyy-MM-dd hh:mm', 'en', 'UTC-3'));

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
    // this.BaseCardServiceSubscription  = this.baseCardService.currentBaseCard.subscribe(
    //   currentData => {
    //     this.baseCard = currentData;
    //   }
    // );

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
    // Se susbcribe para ver cuantos formularios hay abiertos
    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm : 0;
      }
    );

    // VALIDACION SI ES UN USUARIO ADMINISTRADOR Y TIENE TOKEN VIGENTE
    if (this.tokenService.isValidAdmin()) {
      // VALIDACION SI ES UN USUARIO ADMINISTRADOR
      // if (this.tokenService.isAdmin()) {
      this.adminService.setCurrentAdmin(true);

    } else {
      this.adminService.setCurrentAdmin(false);
    }

    this.detailCards = this.uiService.getCards();
    // console.log(this.baseCard);
    
    // this.detailCards = this.baseCard;

    this.statusCards = this.uiService.getStatusCards()

    // Separo los grupos
    this.CardsGroup1 = this.detailCards.filter(function (elem: any) { return elem.grupo == 1; })
    this.CardsGroup2 = this.detailCards.filter(function (elem: any) { return elem.grupo == 2; })

    // Armo etiqueta de cada grupo:
    this.labelGroup1 = this.CardsGroup1.map((valor: any) => {
      return valor.name;
    }).join(this.separador)

    this.labelGroup2 = this.CardsGroup2.map((valor: any) => {
      return valor.name;
    }).join(this.separador)

  }

  ngOnDestroy() {
    // this.isAdminSubscription.unsubscribe();
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();

  }


  ngAfterViewInit(): void {
    let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }


  toggleCards() {
    console.log("toggleCards en main");
    
    this.showBtnAction = !this.showBtnAction;
    // PENDIENTE, DEBO TOGGLEAR LOS ARRAY PARCIALES, NO EL DE ORIGEN
    // this.uiService.toggleDetalles();
    // this.uiService.toggleStatusCards();
    // this.statusCards = this.uiService.getStatusCards()


    // Ya sea que ingrese o salga de una tarjeta, se entiende que no puede 
    // coexistir un formulario abierto
    this.formService.setCurrentForm(0);
  }

  onClick(algo: any) {
    console.log("onClick() de main", algo);
    this.targetCardId = algo.id;
    
  }
}
