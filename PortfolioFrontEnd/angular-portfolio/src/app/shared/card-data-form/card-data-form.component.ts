import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models';
import { FormService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-card-data-form',
  templateUrl: './card-data-form.component.html',
  styleUrls: ['./card-data-form.component.css']
})
export class CardDataFormComponent implements OnInit {
  @Input() item: Card;

  @Input() showForm: boolean;  // flag para mostrar el formulario
  @Output() showFormChange = new EventEmitter<boolean>();

  formData: Card;  // instancia vacia, para cuando se solicite un alta.
  form: FormGroup;

  oldData: Card;  // Copia para reestablecer valores.

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,

  ) { }

  ngOnInit() {
    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm : 0;
      }
    );
    this.form = this.formBuilder.group({
      resume: [this.item.resume, [Validators.maxLength(45)]],

    });
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)
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

  // resetForm(){
  //   this.form.reset();
  // }

  onCancel() {
    // this.resetForm();
    this.toggleForm();

  }

  // upDate(formulario: any) {
  //   console.log("Hice click en guardar", formulario.value);
  //   this.toggleForm();

  // }

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
      if (this.form.get("resume")?.value.trim() != this.formData.resume) {

        if (this.form.valid) {

          this.formData.resume = this.form.get("resume")?.value.trim();

          // estoy por cerrar el formulario, emito orden de actualizarse
          console.log("onEnviar mandaría a guardar esta informacion", this.formData);

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
