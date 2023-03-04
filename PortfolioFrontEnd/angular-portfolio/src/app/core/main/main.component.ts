import { Component, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { now } from 'moment';
import { Subscription } from 'rxjs';
import { FullPersonDTO } from 'src/app/models';

import { DataService, AdminService } from 'src/app/service/data.service';

import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy {
  faTimes = faTimes;

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
  // detailCards filtrandolo segun atributo "group"
  CardsGroup1: any;
  labelGroup1: string;
  CardsGroup2: any;
  labelGroup2: string;
  separador = [" - "];

  element: object;
  fragment: string = 'Init';

 
  // PENDIENTE ELIMINAR VAR DE PRUEBA
  fecha: Date;
  // FIN ELIMINAR VAR DE PRUEBA

  DATAPORTFOLIO: FullPersonDTO;

  // PENDIENTE MODO PRUEBA
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
// FIN MODO PRUEBA


  // Inyectando servicios en el contructor
  constructor(
    private dataService: DataService,
// PENDIENTE MODO PRUEBA
private adminService: AdminService,
// FIN MODO PRUEBA
    
    private miServicio: UiService,
    private tokenService: TokenService,

    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 


  ) {

  }

  ngOnInit(): void {
  
    // Traigo todos los datos del Portfolio
    this.dataService.getPortFolioData().subscribe({
      next: (gralData) => {
        this.DATAPORTFOLIO = gralData;
        this.dataService.changeGralData(gralData);
      },
      error: (e) => {
        // e.status = 0, error del servidor
        // e.status = 400, e.statusText= OK, error en el pedido al servidor
        alert("Response Error (" + e.status + ") en iniciar.sesion.component" + "\n" + e.message);
        console.log("Se quizo obtener los datos sin exito; ", e)
      },
      complete: () => { console.log("Finalizado el proceso de obtener los datos del PortFolio") }
    });

    if (this.tokenService.isValidAdmin()) {
      // PENDIENTE DE ELIMINAR, ESTA SIENDO REEMPLAZADO
      this.dataService.hasCredentials(true);
      // FIN PENDIENTE DE ELIMINAR
      console.log("DESDE EL MAIN, COLOCO TRUE")
      this.dataService.setIsAdmin(true);

    } else {
      console.log("DESDE EL MAIN, COLOCO FALSE")
      this.dataService.setIsAdmin(false);
    }
    
    // this.isAdmin$ = this.dataService.getIsAdmin$();
    // this.isAdmin$.subscribe(isAdmin => this.isAdmin = isAdmin);
    // // PENDIENTE ELIMINAR LINEA SIGUIENTE, SOLUCION DE COMPROMISO PORQUE NO ME ACTULIZA ESTE VALOR
    // // ASINCRONICAMENTE, A PESAR DE USAR UN OBSERVABLE
    // // this.isAdmin = this.dataService.adminStatus();

   
    // PENDIENTE ELIMINAR VAR DE PRUEBA
    this.fecha = new Date(now())
    // FIN ELIMINAR VAR DE PRUEBA

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.detailCards = this.miServicio.getCards();
    this.statusCards = this.miServicio.getStatusCards()


    // Separo los grupos
    this.CardsGroup1 = this.detailCards.filter(function (elem: any) { return elem.group == 1; })
    this.CardsGroup2 = this.detailCards.filter(function (elem: any) { return elem.group == 2; })

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

  onRefreshImg(url: string) {
    console.log("LLEGUE A REFRESHIMG DEL MAIN con esta info", url);
    let element = this.renderer.selectRootElement(`#mifoto`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }


}
