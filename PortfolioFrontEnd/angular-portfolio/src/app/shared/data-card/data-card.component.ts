import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models';
import { AdminService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';

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
    private dataService: DataService,
    
    private formService: FormService,
    private uiService: UiService,  // manejo de las notificaciones

  ) {
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
  }


  ngOnInit(): void {
    // this.botones = this.miServicio.getDetalles()

      // this.esAdmin = true;
  }



  mostrarContenido(dato: any) {
  
    this.accederAlContenido.emit(dato)

  }

  modificarResumen(target: Card) {

    this.targetId = target.id;
    this.formService.setCurrentForm(this.openForm + 1)  // Ingreso directamente al form, lo cuento
        this.showForm = !this.showForm;


  }

  modificarContenido(dato: any) {
    
    this.mostrarContenido(dato)
    this.showCard = !this.showCard;
    this.showCardChange.emit(this.showCard);
    
  }

  onUpdate(card: Card) {
    // Actualizacion de Card
    // Actualizo los datos via dataService
    this.dataService.upDateEntity(card, "/card").subscribe({
      next: (v) => {
        console.log("Guardado correctamente")
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);

      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + card.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr(msg,);

        console.log("Se quizo modificar sin exito a: " + card.name);
      },
      complete: () => console.log("Completado la actualizacion de datos")
    });

  }
}
