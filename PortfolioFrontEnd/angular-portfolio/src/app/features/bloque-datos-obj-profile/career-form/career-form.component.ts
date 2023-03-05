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

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


  showOrgaForm: boolean = false;
  showRoleForm: boolean = false;
  showPrimaryForm: boolean = true;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private baseDataService: BaseDataService,
    private formBuilder: FormBuilder,

    private dialog: MatDialog,  // DeleteModal

    private adminService: AdminService,

  ) {

  }

  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );

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


  togglePrimaryForm() {
    this.showPrimaryForm = !this.showPrimaryForm;
    this.showBtnAction = !this.showBtnAction;
    this.showBtnActionChange.emit(this.showBtnAction);
  }

  toggleOrgaForm() {
    this.togglePrimaryForm();

    // this.dataService.getOrganization().subscribe(organization =>
    //   [this.myOrganizations = organization]
    // );
    this.formData.organization = this.myOrganizations[0]
    this.showOrgaForm = !this.showOrgaForm;

  }

  toggleRoleForm() {
    this.togglePrimaryForm();

    // this.dataService.getRolePosition().subscribe(role =>
    //   [this.myRolePositions = role]
    //   );
    this.formData.roleposition = this.myRolePositions[0]
    this.showRoleForm = !this.showRoleForm;
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

      if (this.myRolePositions != result) {
        this.myRolePositions = result;
        this.myRolePositionsChange.emit(this.myRolePositions);
        // Debo verificar si se editó la organizacion que tenia registrado en el formulario
        this.myRolePositions.forEach(
          (e) => {
            if (e.id == this.formData.roleposition.id) {
              console.log("se actualizo -> ", e)
              this.formData.roleposition = e;
            }
          })
      }
      console.log("Esto estaba en afterClosed()")
    })

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

      console.log(this.form.valid, this.form.get("organizacion")?.value)
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
