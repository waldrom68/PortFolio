import { Component, OnDestroy, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { faPen, faTimes, faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';
import { FullPersonDTO } from 'src/app/models';

import { BaseCardService, BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContainerListComponent } from 'src/app/shared/container-list/container-list.component';



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


  listToOrdered: any;
  oldData: FullPersonDTO;
  // Inyectando servicios en el contructor
  constructor(

    private baseDataService: BaseDataService,
    private baseCardService: BaseCardService,
    private adminService: AdminService,

    private tokenService: TokenService,

    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 

    private dialog: MatDialog,  // Modal para el reordenamiento
  ) {

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;

        this.listToOrdered = this.baseData.hardskill;
        this.oldData = Object.assign({}, this.baseData);
        console.log("main constructor, baseData.hardskill", this.baseData.hardskill);
        console.log("main constructor, oldData", this.oldData.hardskill);
        console.log("main constructor, listToOrdered", this.listToOrdered);

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
  openOrdered() {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      // dialogConfig.panelClass = "modal-component";
      // dialogConfig.backdropClass = "modal-component"
  
      dialogConfig.height = "95%";
      dialogConfig.width = "100%";
      dialogConfig.data = { listToOrdered: this.listToOrdered }
  
      const modalDialog = this.dialog.open(ContainerListComponent, dialogConfig);
  
      modalDialog.afterClosed().subscribe(result => {
  
        // PENDIENTE, ESTO ES ¡ UNA CHANCHADA !, REPENSARLO DESDE CERO
        // Con altas, bajas y modificaciones, ya sea si impactan o no
        // en la DB. Ideal, si hay alta, quede en la instancia nueva, 
        // si se eliminó todo no debiera quedar en blanco, etc.
        if (result.length > 0) {
  
          this.baseData.organization.forEach(
            (e) => {
  
              // if (e.id != this.formData.organization.id ||
              //   e.name != this.formData.organization.name) {
              //   console.log("se actualizo a -> ", e)
              //   // Con esto, logro dejar como seleccionada la opcion en el select.
              //   // No encontré otra manera, de otra forma mostraba seleccion, pero
              //   // no figuraba seleccionado, con ello era invalid.
              //   // In patchValue method of FormGroup, we can omit other fields that 
              //   // is not required to be set dynamically.
              //   this.formData.organization = e;
              //   this.form.patchValue({ organization: e });
  
              // }
            });
  
          // if (!this.formData.organization) {
          //   // console.log("Aparentemente hubo un agregado");
          //   this.formData.organization = result[0];
          // }
  
          // // this.myorganizations = this.oldData
          // this.form.get('organization')?.enable();
  
  
        } else {
          // this.formData.organization = new Organization();
          // this.form.patchValue({
          //   organization: "",
          //   defaultOrg: "selected",
          // });
  
          // this.form.get('organization')?.disable();
        }
  
      })
  
    }
  

  orderedCancel() {
    console.log("llegue a cancelar orden del main");
    this.baseData.hardskill = this.oldData.hardskill;
    this.baseDataService.setCurrentBaseData(this.baseData);
    console.log("Esto tengo en baseData", this.baseData.hardskill);
    // console.log("Esto tengo en oldData", this.oldData);


  }
  orderedUpdate(lista: any) {
    console.log("llegue a guardar orden del main con esto: ", lista);
    console.log("Esto tengo en baseData", this.baseData.hardskill);
    // PENDIENTE, ASEGURAR PERSISTENCIA


  }
}
