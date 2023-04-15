import { Component, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { Card, FullPersonDTO } from 'src/app/models';

import { BaseCardService, BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { TokenService } from 'src/app/service/token.service';
import { UiService, FormService } from 'src/app/service/ui.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faPen = faPen;

  // Datos de las Cards, actualmente recibido desde el Servicio de UI
  // PENDIENTE, sacarlo del sercivio UI
  // detailCards: any;  // 

  // Se van a separar las Cards, según su grupo
  // detailCards filtrandolo segun atributo "grupo"
  CardsGroup1: any;
  CardsGroup2: any;
  
  // Se prepara una etiqueta para separar los grupos
  labelGroup1: string;
  labelGroup2: string;
  separador = [" - "];

  // Se reposicionará el foco dentro de la ventana usando estas variables
  // se hara en todos los componentes, a excepcion de los modales.
  element: object;
  fragment: string = 'Init';
 

  // Datos de la persona del PortFolio
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  detailCards: any;
  private BaseCardServiceSubscription: Subscription | undefined;

  
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  // openForm: number;
  // private formServiceSubscription: Subscription | undefined;

  // nueva logica para el acceso a la info tras un click sobre el Card
  showCard: boolean = true;  
  // showBtnAction: boolean = true;  // inician visibles

  // objeto sobre el cual se hace click
  targetCardId: number = 0;

  // Inyectando servicios en el contructor
  constructor(
    // private dataService: DataService,

    // PENDIENTE MODO PRUEBA
    private baseDataService: BaseDataService,
    private baseCardService: BaseCardService,
    private adminService: AdminService,
    // FIN MODO PRUEBA

    private uiService: UiService,
    private tokenService: TokenService,
    // private formService: FormService,

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
    this.BaseCardServiceSubscription  = this.baseCardService.currentBaseCard.subscribe(
      currentData => {
        this.detailCards = currentData;
      }
    );
    // Se susbcribe para ver cuantos formularios hay abiertos
    // this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
    //   currentForm => {
    //     this.openForm = currentForm > 0 ? currentForm : 0;
    //   }
    // );

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
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

    // this.detailCards = this.uiService.getCards();
    console.log(this.detailCards);
    
  
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
    // this.formServiceSubscription?.unsubscribe();

  }


  ngAfterViewInit(): void {
    let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }


  // toggleCards() {
  //   this.showCard != this.showCard;
    // console.log("pasando por toggleCards de main, showCard queda con valor:", this.showCard);
    
    // this.showBtnAction = !this.showBtnAction;
    // // PENDIENTE, DEBO TOGGLEAR LOS ARRAY PARCIALES, NO EL DE ORIGEN
    // // this.uiService.toggleDetalles();
    // // this.uiService.toggleStatusCards();
    // // this.statusCards = this.uiService.getStatusCards()


    // // Ya sea que ingrese o salga de una tarjeta, se entiende que no puede 
    // // coexistir un formulario abierto
    // this.formService.setCurrentForm(0);
  // }


  accederAlContenido(target: any) {
    // this.showBtnAction = !this.showBtnAction;
    // this.toggleCards()
    this.showCard = false;
    // console.log("accederAlContenido() en el main", target);
    this.targetCardId = target.id;
  }

  cerrarElContenido() {
    // this.toggleCards()
    this.showCard = true;
  }
}
