import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Studie, Organization, Degree, Person } from 'src/app/data';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrganizationComponent } from '../../organization/organization.component';

@Component({
  selector: 'app-studie-form',
  templateUrl: './studie-form.component.html',
  styleUrls: ['./studie-form.component.css']
})
export class StudieFormComponent implements OnInit {
// PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
flagUserAdmin: boolean = false;
flagUserAdmin$: Observable<boolean>;

@Input() formData: Studie;
@Input() user: Person;
@Input() title: string;
@Input() myOrganizations: Organization[];
@Output() myOrganizationChange: EventEmitter<Organization[]> = new EventEmitter;

@Input() myDegrees: Degree[];

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

  constructor(
    private dataService: DataService,
  
    private formBuilder: FormBuilder,

    private dialog: MatDialog,  // DeleteModal
    
  ) {    

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(500) ]],
      startDate:[this.formData.startDate, [Validators.required ]],
      endDate:[this.formData.endDate, []],
      organization:[this.formData.organization, [Validators.required]],
      degree:[this.formData.degree, [Validators.required]],
    }); 
    
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()

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

  openOrganization() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-organization";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "80%";
    dialogConfig.width = "90%";
    dialogConfig.data = {message: "Administración de Organizaciones"}

    const modalDialog =  this.dialog.open(OrganizationComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      console.log("Esto esta en afterClosed()")
      console.log("Se cierra el modal de Organization", result)

      console.log("Esto estaba en afterClosed()")
      this.myOrganizations = result;
      this.myOrganizationChange.emit(this.myOrganizations);
      // Debo verificar si se editó la organizacion que tenia registrado en el formulario
      this.myOrganizations.forEach( (e) => {
        if (e.id == this.formData.organization.id) {
          console.log("se actualizo -> ", e)
          this.formData.organization = e;
        }
      })
      
    })

  }



  togglePrimaryForm() {
    this.showPrimaryForm = !this.showPrimaryForm;
    this.showBtnAction = !this.showBtnAction;
    this.showBtnActionChange.emit(this.showBtnAction);

  }


  toggleOrgaForm() {
    this.togglePrimaryForm();

    this.dataService.getOrganization().subscribe(organization =>
      [this.myOrganizations = organization]
    );
    // this.formData.organization = this.myOrganizations[0] 
    this.showOrgaForm = !this.showOrgaForm;
  }

  toggleDegreeForm() {
    this.togglePrimaryForm();

    this.dataService.getDegree().subscribe(degree =>
      [this.myDegrees = degree]
      );
      this.formData.degree = this.myDegrees[0]
      this.showDegreeForm = !this.showDegreeForm;

  }

  compararOrganizacion(myOrganization1:Organization, myOrganization2:Organization) {
    if (myOrganization1==null || myOrganization2==null) {
      return false;
    } else {
      return myOrganization1.name === myOrganization2.name;
    }
  }
  compararDegree(myDegree1:Degree, myDegree2:Degree) {
    if (myDegree1==null || myDegree2==null) {
      return false;
    } else {
      return myDegree1.name === myDegree2.name;
    }
  }

  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      console.log(this.form.valid, this.form.get("organizacion")?.value)
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value;
        this.formData.startDate = this.form.get("startDate")?.value;
        this.formData.endDate = this.form.get("endDate")?.value;
        this.formData.organization = this.form.get("organization")?.value;
        this.formData.degree = this.form.get("degree")?.value;
        this.formData.status = true;
        this.formData.person = this.user.id 
        this.onUpdate.emit(this.formData);
  
      } else {
        
        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();
  
      }
    }

  }

  onCancel(event: Event, ) {
    this.cancel.emit();

  }

  ngAfterContentChecked() {
    console.log("se termino ngAfterContentChecked")
  }

}