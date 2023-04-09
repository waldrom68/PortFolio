import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { Studie, Organization, Degree, FullPersonDTO } from 'src/app/models';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrganizationComponent } from '../../organization/organization.component';
import { DegreeComponent } from '../../degree/degree.component';
import { formatDate } from '@angular/common';
import { createGreaterThanBirthValidator, createRangeValidator } from 'src/app/shared/myValidators.service';

@Component({
  selector: 'app-studie-form',
  templateUrl: './studie-form.component.html',
  styleUrls: ['./studie-form.component.css']
})
export class StudieFormComponent implements OnInit, OnDestroy {

  @Input() formData: Studie;

  @Input() title: string;

  // @Input() myOrganizations: Organization[];
  // @Output() myOrganizationChange: EventEmitter<Organization[]> = new EventEmitter;
  // @Input() myDegrees: Degree[];
  // @Output() myDegreesChange: EventEmitter<Degree[]> = new EventEmitter;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<Studie> = new EventEmitter();
  @Output() cancel: EventEmitter<Studie> = new EventEmitter();

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


  constructor(

    private formBuilder: FormBuilder,
    private dialog: MatDialog,  // DeleteModal

    private adminService: AdminService,
    private baseDataService: BaseDataService,

  ) {
    if (!this.formData) { this.resetForm() }
  }

  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );

    this.form = this.formBuilder.group({
      name: [this.formData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      startDate: [formatDate(this.formData.startDate, 'yyyy-MM-dd', 'en', 'UTC-3'), [Validators.required, createGreaterThanBirthValidator(this.baseData.since)]],
      endDate: [formatDate(this.formData.endDate, 'yyyy-MM-dd', 'en', 'UTC-3')],

      organization: [this.formData.organization.id ?
        this.formData.organization : '', [Validators.required]],

      degree: [this.formData.degree.id ?
        this.formData.degree : '', [Validators.required]],

    },
    
    // form group validator  
    {
      validators: [createRangeValidator()]
    } );

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );


    this.baseData.organization.length > 0 ?
      this.form.get('organization')?.enable() :
      this.form.get('organization')?.disable()


    this.baseData.roleposition.length > 0 ?
      this.form.get('degree')?.enable() :
      this.form.get('degree')?.disable()

    // Inicializo en falso, porque ingreso directamente en un formulario
    this.showBtnAction = false;
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  get Name(): any {
    return this.form.get("name")
  }
  get StartDate(): any {
    return this.form.get("startDate")
  }
  get EndDate(): any {
    return this.form.get("endDate")
  }
  get Organization(): any {
    return this.form.get("organization")
  }
  get Degree(): any {
    return this.form.get("degree")
  }

  resetForm() {
    // this.formData = { id: 0, name: "", orderdeploy: 0, person: 0 }
    this.formData = new Studie();
  }

  openOrganization() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "90%";
    dialogConfig.width = "95%";
    dialogConfig.data = { message: "Organizaciones" }

    const modalDialog = this.dialog.open(OrganizationComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {

      // PENDIENTE, ESTO ES ¡ UNA CHANCHADA !, REPENSARLO DESDE CERO
      // Con altas, bajas y modificaciones, ya sea si impactan o no
      // en la DB. Ideal, si hay alta, quede en la instancia nueva, 
      // si se eliminó todo no debiera quedar en blanco, etc.
      if (result.length > 0) {

        this.baseData.organization.forEach(
          (e) => {

            if (e.id != this.formData.organization.id ||
              e.name != this.formData.organization.name) {
              console.log("se actualizo a -> ", e)
              // Con esto, logro dejar como seleccionada la opcion en el select.
              // No encontré otra manera, de otra forma mostraba seleccion, pero
              // no figuraba seleccionado, con ello era invalid.
              // In patchValue method of FormGroup, we can omit other fields that 
              // is not required to be set dynamically.
              this.formData.organization = e;
              this.form.patchValue({ organization: e });

            }
          });

        if (!this.formData.organization) {
          // console.log("Aparentemente hubo un agregado");
          this.formData.organization = result[0];
        }

        // this.myorganizations = this.oldData
        this.form.get('organization')?.enable();


      } else {
        this.formData.organization = new Organization();
        this.form.patchValue({
          organization: "",
          defaultOrg: "selected",
        });

        this.form.get('organization')?.disable();
      }

    })

  }

  openDegree() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "90%";
    dialogConfig.width = "95%";
    dialogConfig.data = { message: "Niveles de Formación" }

    const modalDialog = this.dialog.open(DegreeComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {

      // PENDIENTE, ESTO ES ¡ UNA CHANCHADA !, REPENSARLO DESDE CERO
      // Tiene que quedar sincronizado myRolepositions y formData
      // Con altas, bajas y modificaciones, ya sea si impactan o no
      // en la DB. Ideal, si hay alta, quede en la instancia nueva, 
      // si se eliminó todo no debiera quedar en blanco, etc.

      if (result.length > 0) {

        this.baseData.degree.forEach(
          (e) => {

            if (e.id == this.formData.degree.id &&
              e.name != this.formData.degree.name) {
              console.log("se actualizo -> ", e)
              // Con esto, logro dejar como seleccionada la opcion en el select.
              // No encontré otra manera, de otra forma mostraba seleccion, pero
              // no figuraba seleccionado, con ello era invalid.
              // In patchValue method of FormGroup, we can omit other fields that 
              // is not required to be set dynamically.
              this.formData.degree = e;
              this.form.patchValue({ degree: e });
            }
          })
        if (!this.formData.degree) {

          this.formData.degree = result[0];
        }

        this.form.get('degree')?.enable();

      } else {  // la lista de roles quedó vacía

        this.formData.degree = new Degree();
        this.form.patchValue({
          degree: "",
          defaultPos: "selected"
        });
        this.form.get('degree')?.disable();
        this.baseDataService.setCurrentBaseData(this.baseData)

      }
    })
  }

  // Es para que en los select se ubiquen en los valores que tuvieren registrado
  compararOrganizacion(myOrganization1: Organization, myOrganization2: Organization) {
    if (myOrganization1 == null || myOrganization2 == null) {
      return false;
    } else {
      return myOrganization1.name === myOrganization2.name;
    }
  }
  compararDegree(myDegree1: Degree, myDegree2: Degree) {
    if (myDegree1 == null || myDegree2 == null) {
      return false;
    } else {
      return myDegree1.name === myDegree2.name;
    }
  }

  onEnviar(event: Event,) {
    event.preventDefault;

    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {

      // Hubo cambios
      if (this.form.get("name")?.value.trim() != this.formData.name ||
        this.form.get("startDate")?.value != formatDate(this.formData.startDate, 'yyyy-MM-dd', 'en', 'UTC-3' ) ||
        this.form.get("endDate")?.value != formatDate(this.formData.endDate, 'yyyy-MM-dd', 'en', 'UTC-3' ) ||
        this.form.get("organization")?.value != this.formData.organization ||
        this.form.get("degree")?.value != this.formData.degree) {

        if (this.form.valid) {

          this.formData.name = this.form.get("name")?.value.trim();
          this.formData.startDate = this.form.get("startDate")?.value;
          this.formData.endDate = this.form.get("endDate")?.value;
          this.formData.organization = this.form.get("organization")?.value;
          this.formData.degree = this.form.get("degree")?.value;
          this.formData.status = true;
          this.formData.person = this.baseData.id
          // estoy por cerrar el formulario, emito orden de actualizarse
          this.onUpdate.emit(this.formData);

        } else {

          console.log("no es valido el valor ingresado", this.form)
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

  // ngAfterContentChecked() {
  //   console.log("se termino ngAfterContentChecked")
  // }

}