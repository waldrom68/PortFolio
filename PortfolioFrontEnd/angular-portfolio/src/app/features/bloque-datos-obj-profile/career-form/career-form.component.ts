import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  // @Input() myOrganizations: Organization[];
  // @Output() myOrganizationChange: EventEmitter<Organization[]> = new EventEmitter;
  // @Input() myRolePositions: RolePosition[];
  // @Output() myRolePositionsChange: EventEmitter<RolePosition[]> = new EventEmitter;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<LaboralCareer> = new EventEmitter();
  @Output() cancel: EventEmitter<LaboralCareer> = new EventEmitter();

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;

  // oldData: LaboralCareer[];

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
    // // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    // this.oldData = Object.assign({}, this.baseData.roleposition)
    
    // console.log(this.formData.organization);
    this.form = this.formBuilder.group({
      resume: [this.formData.resume, [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
      startDate: [formatDate(this.formData.startDate, 'yyyy-MM-dd', 'en'), [Validators.required]],
      endDate: [formatDate(this.formData.endDate, 'yyyy-MM-dd', 'en'), []],

      organization: [this.formData.organization.id > 0 ?
        this.formData.organization : '', [Validators.required]],

      roleposition: [this.formData.roleposition.id > 0 ?
        this.formData.roleposition : '', [Validators.required]],
    });


    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.baseData.organization.length > 0 ?
      this.form.get('organization')?.enable() :
      this.form.get('organization')?.disable()


    this.baseData.roleposition.length > 0 ?
      this.form.get('roleposition')?.enable() :
      this.form.get('roleposition')?.disable()

    // this.resetForm();
    // console.log("Estoy en ngOnInit de career-form.component esto está en formData", this.formData);
    // console.log("Estoy en ngOnInit de career-form.component esto está en oldData", this.oldData);

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

  // togglePrimaryForm() {
  //   this.showPrimaryForm = !this.showPrimaryForm;
  //   this.showBtnAction = !this.showBtnAction;
  //   this.showBtnActionChange.emit(this.showBtnAction);
  // }

  // toggleOrgaForm() {
  //   // this.togglePrimaryForm();
  //   if (this.myOrganizations) {
  //     this.formData.organization = this.myOrganizations[0];
  //   }
  //   this.openOrganization();
  //   // this.showOrgaForm = !this.showOrgaForm;
  // }

  // toggleRoleForm() {
  //   // this.togglePrimaryForm();
  //   if (this.myRolePositions) {
  //     this.formData.roleposition = this.myRolePositions[0]
  //   }
  //   // this.showRoleForm = !this.showRoleForm;
  //   this.openRolePosition();
  // }


  // .mat-dialog-container {
  //   padding: 1em;

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

  openRolePosition() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "90%";
    dialogConfig.width = "95%";
    dialogConfig.data = { message: "Posiciones / Roles" }

    const modalDialog = this.dialog.open(RolePositionComponent, dialogConfig);

    // PENDIENTE, CREO QUE NO HAY QUE CONTROLAR ESTO, PUES LOS CAMBIOS LOS HACE EN
    // LOS COMPONENTES A LOS QUE LLAMA, EN ESTE CASO A ROLEPOSITION.COMPONENT
    modalDialog.afterClosed().subscribe(result => {

      // PENDIENTE, ESTO ES ¡ UNA CHANCHADA !, REPENSARLO DESDE CERO
      // Tiene que quedar sincronizado myRolepositions y formData
      // Con altas, bajas y modificaciones, ya sea si impactan o no
      // en la DB. Ideal, si hay alta, quede en la instancia nueva, 
      // si se eliminó todo no debiera quedar en blanco, etc.

      if (result.length > 0) {

        this.baseData.roleposition.forEach(
          (e) => {

            if (e.id == this.formData.roleposition.id &&
              e.name != this.formData.roleposition.name) {
              console.log("se actualizo a -> ", e)
              // Con esto, logro dejar como seleccionada la opcion en el select.
              // No encontré otra manera, de otra forma mostraba seleccion, pero
              // no figuraba seleccionado, con ello era invalid.
              // In patchValue method of FormGroup, we can omit other fields that 
              // is not required to be set dynamically.
              this.formData.roleposition = e;
              this.form.patchValue({ roleposition: e });
              // this.form.controls['roleposition'].patchValue({disabled:false})

            }
          });

        if (!this.formData.roleposition) {

          this.formData.roleposition = result[0];
        }

        this.form.get('roleposition')?.enable();


      } else {  // la lista de roles quedó vacía
        this.formData.roleposition = new RolePosition();
        this.form.patchValue({
          roleposition: "",
          defaultRol: "selected"
        });
        this.form.get('roleposition')?.disable();
        this.baseDataService.setCurrentBaseData(this.baseData)

      }

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

    // console.log(this.form);

    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {

      if (this.form.valid) {

        this.formData.resume = this.form.get("resume")?.value.trim();
        this.formData.startDate = this.form.get("startDate")?.value;
        this.formData.endDate = this.form.get("endDate")?.value;
        this.formData.organization = this.form.get("organization")?.value;
        this.formData.roleposition = this.form.get("roleposition")?.value;
        this.formData.status = true;
        this.formData.person = this.baseData.id
        // estoy por cerrar el formulario, emito orden de actualizarse
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

  // ngAfterContentChecked() {

  // }

}
