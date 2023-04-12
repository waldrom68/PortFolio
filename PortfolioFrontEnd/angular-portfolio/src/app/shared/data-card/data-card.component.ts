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

  onClick(target: any) {
    this.targetId = target;
    console.log(target);
    
  }
  toggleContenedor(dato: string) {
    this.toggleCards.emit();

    this.miServicio.toggleDetalles(dato);
    // console.log(this.miServicio.getDetalles())
    // console.log("hice click para ver detalles", dato)
    // console.log("Y esto es lo que obtengo", this.miServicio.getCards())

  }

  toggleForm(event: Event) {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    // this.showBtnAction = !this.showBtnAction;

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }
  }


}
