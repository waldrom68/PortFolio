import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AdminService } from 'src/app/service/auth.service';

import { FullPersonDTO, Project } from 'src/app/models';
import { formatDate } from '@angular/common';
import { BaseDataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css'],
})
export class ProjectsFormComponent implements OnInit, OnDestroy {

  @Input() formData: Project;

  @Input() title: string;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<Project> = new EventEmitter()
  @Output() cancel: EventEmitter<Project> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;
  minSince: string = '1970/03/1';
  maxSince: string = '2030/05/1';

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

  ngOnInit() {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );


    this.form = this.formBuilder.group({
      name: [this.formData.name, [Validators.required, Validators.minLength(1)]],
      resume: [this.formData.resume, [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      since: [formatDate(this.formData.since ? this.formData.since : new Date(),
        'yyyy-MM-dd', 'en'), [Validators.required]],
      url: [this.formData.url]
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
  get Resume(): any {
    return this.form.get("resume")
  }
  get Since(): any {
    return this.form.get("since")
  }
  get Url(): any {
    return this.form.get("url");
  }

  resetForm() {
    this.formData = new Project();

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
        this.form.get("resume")?.value != this.formData.resume ||
        this.form.get("since")?.value != formatDate(this.formData.since,'yyyy-MM-dd', 'en') ||
        this.form.get("url")?.value != this.formData.url) {

        if (this.form.valid) {

          this.formData.name = this.form.get("name")?.value.trim();
          this.formData.resume = this.form.get("resume")?.value.trim();
          this.formData.since = this.form.get("since")?.value;
          this.formData.url = this.form.get("url")?.value.trim();
          this.formData.person = this.baseData.id
          // estoy por cerrar el formulario, emito orden de actualizarse
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
