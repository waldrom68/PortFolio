import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/auth.service';

import { RolePosition } from 'src/app/models';
@Component({
  selector: 'app-roleposition-form',
  templateUrl: './roleposition-form.component.html',
  styleUrls: ['./roleposition-form.component.css']
})
export class RolepositionFormComponent implements OnInit, OnDestroy {

  // @Input() formData: RolePosition;
  @Input() title: string;
  @Input() item: RolePosition;

  @Output() onUpdate: EventEmitter<RolePosition> = new EventEmitter()
  @Output() cancel: EventEmitter<RolePosition> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  formData: RolePosition;
  form: FormGroup;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {

    if (!this.item) {
      this.resetForm()

    } else {

      this.formData = this.item;
    }

    this.form = this.formBuilder.group({
      name: [this.formData.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],

    });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {

    this.AdminServiceSubscription?.unsubscribe();
  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }
  get Name(): any {
    return this.form.get("name")
  }

  resetForm() {
    this.formData = new RolePosition();
  }


  onEnviar(event: Event,) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {

      // console.log(this.form.statusChanges);
      // Hubo cambios
      if (this.form.get("name")?.value.trim() != this.formData.name) {


        if (this.form.valid) {

          this.formData.name = this.form.get("name")?.value.trim();
          this.onUpdate.emit(this.formData);

        } else {

          console.log("no es valido el valor ingresado")
          this.form.markAllAsTouched();

        }

      } else {
        console.log("Evitando http, no hubo cambio en los datos");
        this.cancel.emit();
      }

    }

  }
  onCancel(event: Event,) {
    this.cancel.emit();

  }

}
