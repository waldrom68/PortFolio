import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import {  Subscription } from 'rxjs';

import { AdminService } from 'src/app/service/auth.service';

import { FullPersonDTO, HardSkill } from 'src/app/models';
import { BaseDataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-hard-form',
  templateUrl: './hard-form.component.html',
  styleUrls: ['./hard-form.component.css']
})
export class HardFormComponent implements OnInit, OnDestroy {

  @Input() formData: HardSkill;

  @Input() title: string;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<HardSkill> = new EventEmitter()
  @Output() cancel: EventEmitter<HardSkill> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;
  minAssessment: number = 0;
  maxAssessment: number = 100;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,

    private adminService: AdminService,
    private baseDataService: BaseDataService,
  ) {

  }

  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );

    this.form = this.formBuilder.group({
      name: [this.formData.name, [Validators.required, Validators.minLength(1)]],
      assessment: [this.formData.assessment, [Validators.required, Validators.max(this.maxAssessment), Validators.min(this.minAssessment)]],
    });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    // Inicializo en falso, porque ingreso directamente en un formulario
    this.showBtnAction = false;
    this.showBtnActionChange.emit(this.showBtnAction)

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
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
    this.formData = new HardSkill();
  }

  onEnviar(event: Event,) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {

      if (this.form.valid) {

        this.formData.name = this.form.get("name")?.value.trim();
        this.formData.assessment = this.form.get("assessment")?.value;
        this.formData.person = this.baseData.id
        // estoy por cerrar el formulario, emito orden de actualizarse
        this.onUpdate.emit(this.formData);

      } else {

        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();

      }
    }

  }

  onCancel(event: Event,) {
    this.cancel.emit();

  }


}
