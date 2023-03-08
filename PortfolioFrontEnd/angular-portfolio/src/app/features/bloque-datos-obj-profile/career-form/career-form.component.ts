import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { LaboralCareer, Organization, RolePosition, FullPersonDTO } from 'src/app/models';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrganizationComponent } from '../../organization/organization.component';
import { RolePositionComponent } from '../../role-position/role-position.component';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.css']
})
export class CareerFormComponent implements OnInit, OnDestroy {

  @Input() formData: LaboralCareer;

  @Input() title: string;
  @Input() myOrganizations: Organization[];
  @Output() myOrganizationChange: EventEmitter<Organization[]> = new EventEmitter;

  @Input() myRolePositions: RolePosition[];
  @Output() myRolePositionsChange: EventEmitter<RolePosition[]> = new EventEmitter;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<LaboralCareer> = new EventEmitter();
  @Output() cancel: EventEmitter<LaboralCareer> = new EventEmitter();

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;

  showOrgaForm: boolean = false;
  showRoleForm: boolean = false;
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
    console.log("Estoy pasando por career-form.componente, formData", this.formData, this.formData.MyClass);

    this.form = this.formBuilder.group({
      resume: [this.formData.resume, [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
      startDate: [formatDate(this.formData.startDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
      endDate: [formatDate(this.formData.endDate, 'yyyy-MM-dd', 'en'), []],
      organization: [this.formData.organization, [Validators.required]],
      roleposition: [this.formData.roleposition, [Validators.required]],
    });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    // this.resetForm();
    console.log("Estoy en ngOnInit de career-form.component esto está en formData", this.formData);

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  get Resume(): any {
    return this.form.get("resume")
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
  get Roleposition(): any {
    return this.form.get("roleposition")
  }

  resetForm() {
    // this.formData = { id: 0, name: "", orderdeploy: 0, person: 0 }
    this.formData = new LaboralCareer();
  }
  togglePrimaryForm() {
    this.showPrimaryForm = !this.showPrimaryForm;
    this.showBtnAction = !this.showBtnAction;
    this.showBtnActionChange.emit(this.showBtnAction);
  }

  toggleOrgaForm() {
    this.togglePrimaryForm();
    if (this.myOrganizations) {
      this.formData.organization = this.myOrganizations[0];
    }
    this.openOrganization();
    // this.showOrgaForm = !this.showOrgaForm;
  }

  toggleRoleForm() {
    this.togglePrimaryForm();
    if (this.myRolePositions) {
      this.formData.roleposition = this.myRolePositions[0]
    }
    // this.showRoleForm = !this.showRoleForm;
    this.openRolePosition();
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
      // this.togglePrimaryForm();
    })

  }

  openRolePosition() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "80%";
    dialogConfig.width = "90%";
    dialogConfig.data = { message: "Posiciones / Roles" }

    const modalDialog = this.dialog.open(RolePositionComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log("Esto esta en afterClosed()")
      console.log("Hubo cambios?", this.myRolePositions != result)
      console.log(this.myRolePositions, result);
      
      if (this.myRolePositions != result) {
        // Debo verificar si se editó la organizacion que tenia registrado en el formulario
        this.myRolePositions.forEach(
          (e) => {
            if (e.id == this.formData.roleposition.id) {
              console.log("se actualizo -> ", e)
              this.formData.roleposition = e;
            }
          })

        this.myRolePositions = result;
        this.myRolePositionsChange.emit(this.myRolePositions);
      }
      console.log("Esto estaba en afterClosed()")
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
  compararRoles(myRolePosition1: RolePosition, myRolePosition2: RolePosition) {
    if (myRolePosition1 == null || myRolePosition2 == null) {
      return false;
    } else {
      return myRolePosition1.name == myRolePosition2.name;
    }
  }

  onEnviar(event: Event,) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {

      console.log(this.form.valid, this.form.get("organizacion"))
      if (this.form.valid) {

        this.formData.resume = this.form.get("resume")?.value.trim();
        this.formData.startDate = this.form.get("startDate")?.value;
        this.formData.endDate = this.form.get("endDate")?.value;
        this.formData.organization = this.form.get("organization")?.value;
        this.formData.roleposition = this.form.get("roleposition")?.value;
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
