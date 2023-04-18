import { Component, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { FullPersonDTO } from 'src/app/models';

import { BaseCardService, BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';



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

    private baseDataService: BaseDataService,
    private baseCardService: BaseCardService,
    private adminService: AdminService,

    private tokenService: TokenService,
  
    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 

  ) {

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );

    this.BaseCardServiceSubscription = this.baseCardService.currentBaseCard.subscribe(
      currentData => {
        this.detailCards = currentData;
      }
    );

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnInit(): void {
    // VALIDACION SI ES UN USUARIO ADMINISTRADOR Y SI TIENE TOKEN VIGENTE
    if (this.tokenService.isValidAdmin()) {

      this.adminService.setCurrentAdmin(true);
    } else {

      this.adminService.setCurrentAdmin(false);
    }

    this.prepareLayout();
    this.sortCard();

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.BaseCardServiceSubscription?.unsubscribe();

  }


  accederAlContenido(target: any) {
    this.showCard = false;
    this.targetCardId = target.id;
  }


  cerrarElContenido() {
    this.showCard = true;
  }

  prepareLayout() {
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

  
  sortCard() {
    this.CardsGroup1.sort((a: any, b: any) =>
      a.grupo - b.grupo ||
      a.orderdeploy - b.orderdeploy ||
      a.name.localeCompare(b.name)
    );
    this.CardsGroup2.sort((a: any, b: any) =>
      a.grupo - b.grupo ||
      a.orderdeploy - b.orderdeploy ||
      a.name.localeCompare(b.name)
    );
  }

  ngAfterViewInit(): void {
    // Posiciono el foco en el elemento inicial para que se vea lo que solicitó ver.
    let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }


  // PENDIENTE ###########################################
  cambio() {
    // ELIMINAR METODO DE PRUEBA AL IMPLEMENTAR MODULO DE REORDENADO
    console.log("Ordené cambiar orden");

    for (let index = 0; index < this.CardsGroup1.length; index++) {
      const element = this.CardsGroup1[index];
      element.orderdeploy = 1;
      if (element.name == "Perfil") {
        element.orderdeploy = 0;
      }
    }

    for (let index = 0; index < this.CardsGroup2.length; index++) {
      const element = this.CardsGroup2[index];
      element.orderdeploy = 1;
      if (element.name == "Habilidades técnicas") {
        element.orderdeploy = 0;
      }
    }

    // LOS PASOS REALES SERÍAN:
    // asegurar la peristencia de los datos
    // actualizo detailCards
    // preparo layout separando los grupos y armando los separadores
    // ordeno los CardsGroups
    this.baseCardService.setCurrentBaseCard(this.detailCards);
    this.prepareLayout();
    this.sortCard();

  }

}
