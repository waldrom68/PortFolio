import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models';
import { AdminService } from 'src/app/service/auth.service';

import { FormService, UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;
  @Input() card: Card;

  // PENDIENTE Esta entrada no la uso para nada
  @Input() detailCard: Card[];
  @Output() toggleCards = new EventEmitter();

  showForm: boolean = false;  // flag para mostrar o no el formulario
  targetId: number = 0;  // para abrir sólo el form del item sobre el cual se hizo click
  // statusCards:boolean;

  // Manejo de la visibilidad de los botones para acceder a los forms
  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  // Menejo de la visibilidad de las etiquetes o del componente con los datos
  @Input() showCard!: boolean;
  @Output() showCardChange = new EventEmitter<boolean>();


  @Output() accederAlContenido = new EventEmitter<boolean>();




  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;


  constructor(
    // private miServicio: UiService,
    private adminService: AdminService,

    private formService: FormService,

  ) {

  }


  ngOnInit(): void {
    // this.botones = this.miServicio.getDetalles()
    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm : 0;
      }
    );

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
      // this.esAdmin = true;
  }

  // OLDonClick(target: any) {
  //   // Variable para filtrar sólo sobre el objeto sobre el cual se hizo click
  //   this.targetId = target.id;
  //   this.showForm = true;
  //   console.log("Desde data-card onClick emito el toggleCards con el dato:", target);
    
  //   this.toggleCards.emit(target);

  // }



  mostrarContenido(dato: any) {
    console.log("Desde data-card mostrarContenido emito el showCard con el dato:", dato);
    console.log("El showCard tiene el valor de -> ", this.showCard);
    
    this.accederAlContenido.emit(dato)

  }

  modificarResumen(target: Card) {
    this.targetId = target.id;
    console.log("Click en modificarResumen", target);
    console.log(this.targetId);
    this.formService.setCurrentForm(this.openForm + 1)  // Ingreso directamente al form, lo cuento
    
    this.showForm = !this.showForm;
    // this.showCard = !this.showCard;
    // this.showCardChange.emit(this.showCard);

  }

  modificarContenido(dato: any) {
    console.log("Click en modificarContenido", dato);
    
    this.mostrarContenido(dato)
    this.showCard = !this.showCard;
    this.showCardChange.emit(this.showCard);
    
  }

}
