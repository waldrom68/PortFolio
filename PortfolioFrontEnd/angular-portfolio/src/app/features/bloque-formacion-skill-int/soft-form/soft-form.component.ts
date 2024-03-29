import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes, faHand } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/auth.service';

import { SoftSkill } from 'src/app/models';

@Component({
  selector: 'app-soft-form',
  templateUrl: './soft-form.component.html',
  styleUrls: ['./soft-form.component.css']
})
export class SoftFormComponent implements OnInit, OnDestroy {

  @Input() formData: SoftSkill;
  @Input() title: string;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<SoftSkill> = new EventEmitter()
  @Output() cancel: EventEmitter<SoftSkill> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;
  faHand = faHand;

  form: FormGroup;
  minAssessment: number = 0;
  maxAssessment: number = 5;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;


  constructor(
    private formBuilder: FormBuilder,

    private adminService: AdminService,
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [this.formData.name, [Validators.required, Validators.minLength(3)]],
      assessment: [this.formData.assessment, [Validators.required, Validators.max(this.maxAssessment), Validators.min(this.minAssessment)]],
    });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
    // this.resetForm();

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

  get Assessment(): any {
    return this.form.get("assessment")
  }

  resetForm() {
    this.formData = new SoftSkill();
  }

  onEnviar(event: Event,) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {
      // console.log(this.form.statusChanges);
      // Hubo cambios
      if (this.form.get("name")?.value.trim() != this.formData.name ||
        this.form.get("assessment")?.value != this.formData.assessment) {

        if (this.form.valid) {

          this.formData.name = this.form.get("name")?.value.trim();
          this.formData.assessment = this.form.get("assessment")?.value;
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
