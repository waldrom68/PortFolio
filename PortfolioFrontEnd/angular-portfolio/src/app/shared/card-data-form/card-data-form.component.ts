import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Card, FullPersonDTO, Person } from 'src/app/models';
import { AdminService } from 'src/app/service/auth.service';
import { BaseCardService, BaseDataService, DataService, ToPerson } from 'src/app/service/data.service';
import { FormService, UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-card-data-form',
  templateUrl: './card-data-form.component.html',
  styleUrls: ['./card-data-form.component.css']
})
export class CardDataFormComponent implements OnInit, OnDestroy {
  @Input() item: Card;

  @Input() showForm: boolean;  // flag para mostrar el formulario
  @Output() showFormChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<Card> = new EventEmitter()
  
  form: FormGroup;
  oldData: Card;  // Copia para reestablecer valores.

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;
  baseCard: Card;
  private BaseCardServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  converPerson: Person;
  
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private baseDataService: BaseDataService,
    // private baseCardService: BaseCardService,
    private dataService: DataService,
    private uiService: UiService,  // manejo de las notificaciones

    private adminService: AdminService,

  ) {

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );

    // this.BaseCardServiceSubscription = this.baseCardService.currentBaseCard.subscribe(
    //   currentData => {
    //     this.baseCard = currentData;
    //   }
    // );

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm : 0;
      }
    );

   }

  ngOnInit() {



    this.form = this.formBuilder.group({
      resume: [this.item.resume, [Validators.maxLength(45)]],

    });

    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)
  }

  ngOnDestroy() {

    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();

  }


  get Resume(): any {
    return this.form.get("resume")
  }


  toggleForm() {
    // Cierra el formulario de edicion o creacion

    this.showForm = !this.showForm;
    this.showFormChange.emit(this.showForm)
    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }

  }



  onCancel() {
    // this.resetForm();
    console.log("Cerrando el form del resumen");
    this.toggleForm();

  }


  onEnviar(event: Event,) {
    event.preventDefault;
    console.log("Hice click en guardar");

    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {
      console.log("Ya no eres Admin jaaa jaa, por eso no anda");
      
      this.onCancel();

    } else {
      this.toggleForm();
      // console.log(this.form.statusChanges);
      // Hubo cambios
      if (this.form.get("resume")?.value.trim() != this.oldData.resume) {

        if (this.form.valid) {

          this.item.resume = this.form.get("resume")?.value.trim();
          
          // estoy por cerrar el formulario, emito orden de actualizarse

          console.log("onEnviar mandaría a guardar esta informacion", this.item);
          this.onUpdate.emit(this.item)

        } else {

          console.log("no es valido el valor ingresado")
          this.form.markAllAsTouched();

        }

      } else {
        console.log("Evitando http, no hubo cambio en los datos");
        this.onCancel();
      }

    }
  }


}
