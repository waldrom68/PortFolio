import { Component, EventEmitter, Input, OnInit, Output, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { Studie, Organization, Degree, Person, FullPersonDTO } from 'src/app/models';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrganizationComponent } from '../../organization/organization.component';
import { DegreeComponent } from '../../degree/degree.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-studie-form',
  templateUrl: './studie-form.component.html',
  styleUrls: ['./studie-form.component.css']
})
export class StudieFormComponent implements OnInit, OnDestroy {

  @Input() formData: Studie;

  @Input() title: string;
  @Input() myOrganizations: Organization[];
  @Output() myOrganizationChange: EventEmitter<Organization[]> = new EventEmitter;

  @Input() myDegrees: Degree[];
  @Output() myDegreesChange: EventEmitter<Degree[]> = new EventEmitter;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<Studie> = new EventEmitter();
  @Output() cancel: EventEmitter<Studie> = new EventEmitter();

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;

  showOrgaForm: boolean = false;
  showDegreeForm: boolean = false;
  showPrimaryForm: boolean = true;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;



  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,  // DeleteModal

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
    console.log("Estoy pasando por studie-form.componente, formData", this.formData, this.formData.MyClass);

    this.form = this.formBuilder.group({
      name: [this.formData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      startDate: [formatDate(this.formData.startDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
      endDate: [formatDate(this.formData.endDate, 'yyyy-MM-dd', 'en'), []],
      organization: [this.formData.organization, [Validators.required]],
      degree: [this.formData.degree, [Validators.required]],
    });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
    // this.resetForm();
    console.log("Estoy en ngOnInit de studie-form.component esto está en formData", this.formData);

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
  togglePrimaryForm() {
    this.showPrimaryForm = !this.showPrimaryForm;
    this.showBtnAction = !this.showBtnAction;
    this.showBtnActionChange.emit(this.showBtnAction);
  }

  toggleOrgaForm() {
    // this.togglePrimaryForm();
    if (this.myOrganizations) {
      this.formData.organization = this.myOrganizations[0];
    }
    // this.showOrgaForm = !this.showOrgaForm;
    this.openOrganization();
  }

  toggleDegreeForm() {
    // this.togglePrimaryForm();
    if (this.myDegrees) {
      this.formData.degree = this.myDegrees[0];
    }
    // this.showDegreeForm = !this.showDegreeForm;
    this.openDegree();
  }

  openOrganization() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "80%";
    dialogConfig.width = "90%";
    dialogConfig.data = { message: "Organizaciones" }

    const modalDialog = this.dialog.open(OrganizationComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log("Esto esta en afterClosed()")
      console.log("Hubo cambios?", this.myOrganizations != result)

      if (this.myOrganizations != result) {
        this.myOrganizations = result;
        this.myOrganizationChange.emit(this.myOrganizations);
        // Debo verificar si se editó la organizacion que tenia registrado en el formulario
        this.myOrganizations.forEach((e) => {
            if (e.id == this.formData.organization.id) {
              console.log("se actualizo -> ", e)
              this.formData.organization = e;
            }
          })
      }
      console.log("Esto estaba en afterClosed()")
    })
    // this.togglePrimaryForm();
  }

  openDegree() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "80%";
    dialogConfig.width = "90%";
    dialogConfig.data = { message: "Niveles de Formación" }

    const modalDialog = this.dialog.open(DegreeComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log("Esto esta en afterClosed()")
      console.log("Hubo cambios?", this.myDegrees != result)
      console.log(this.myDegrees, result);
      
      if (this.myDegrees != result) {

        // Debo verificar si se editó la organizacion que tenia registrado en el formulario
        this.myDegrees.forEach(
          (e) => {
            if (e.id == this.formData.degree.id) {
              console.log("se actualizo -> ", e)
              this.formData.degree = e;
            }
          })
        this.myDegrees = result;
        this.myDegreesChange.emit(this.myDegrees);
      }
      console.log("Esto estaba en afterClosed(), studie-form", this.formData)
    })
    // this.togglePrimaryForm();
  }

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

      console.log(this.form.valid, this.form.get("organizacion")?.value)
      if (this.form.valid) {

        this.formData.name = this.form.get("name")?.value.trim();
        this.formData.startDate = this.form.get("startDate")?.value;
        this.formData.endDate = this.form.get("endDate")?.value;
        this.formData.organization = this.form.get("organization")?.value;
        this.formData.degree = this.form.get("degree")?.value;
        this.formData.status = true;
        this.formData.person = this.baseData.id
        this.onUpdate.emit(this.formData);

      } else {

        console.log("no es valido el valor ingresado", this.form)
        this.form.markAllAsTouched();

      }
    }

  }

  onCancel(event: Event,) {
    this.cancel.emit();
  }

  ngAfterContentChecked() {
    console.log("se termino ngAfterContentChecked")
  }

}