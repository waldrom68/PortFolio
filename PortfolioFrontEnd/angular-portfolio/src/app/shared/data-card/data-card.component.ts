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

  // PENDIENTE Esta entrada no la uso para nada
  @Input() detailCard: Card[];
  @Output() toggleCards = new EventEmitter();

  showForm: boolean = false;  // flag para mostrar o no el formulario
  targetId: number = 0;  // para abrir sólo el form del item sobre el cual se hizo click
  // statusCards:boolean;

  // Renombrar luego a showCard
  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();



  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;


  constructor(
    private miServicio: UiService,
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

  onClick(target: any, leyenda:string) {
    this.targetId = target.id;
    this.showForm = true;
    console.log("Hice click en", leyenda," Desde data-card onClick modo ADMIN hice click en", target, "showForm está en:", this.showForm);
    this.toggleCards.emit(target);
    // this.onClickCard.emit(this.targetId);
  }

  toggleContenedor(dato: any) {
    console.log("Desde data-card ToggleContenedor mando este dato al servicio", dato);
    this.toggleCards.emit(dato);

    // this.miServicio.toggleDetalles(dato);
    

  }

  toggleForm(event: Event) {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    console.log("Desde data-card ToggleForm modo ADMIN hice click en",event)
    // REnombrar a showCards ------
    console.log("toggleCards en Data-card");
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)




    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }
  }


}
