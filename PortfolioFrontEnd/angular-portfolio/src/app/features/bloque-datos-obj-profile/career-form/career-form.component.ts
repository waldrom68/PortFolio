import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { LaboralCareer, Organization, RolePosition } from 'src/app/data';

@Component({
  selector: 'app-career-form',
  templateUrl: './career-form.component.html',
  styleUrls: ['./career-form.component.css']
})
export class CareerFormComponent implements OnInit {
// PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
flagUserAdmin: boolean = false;
flagUserAdmin$: Observable<boolean>;

@Input() formData: LaboralCareer;
@Input() title: string;
@Output() onUpdate: EventEmitter<LaboralCareer> = new EventEmitter()
@Output() cancel: EventEmitter<LaboralCareer> = new EventEmitter()

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;
myOrganization: Organization[];
myRolePosition: RolePosition[];
seleccionadoOrga: Organization;
seleccionadoRole: RolePosition;

  constructor(
    private dataService: DataService,

    private formBuilder: FormBuilder,
  ) { 
    this.dataService.getOrganization().subscribe(data =>
      this.myOrganization = data
    );
    this.dataService.getRolePosition().subscribe(data =>
      this.myRolePosition = data
    );

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      resume:[this.formData.resume, [Validators.required, Validators.minLength(2), Validators.maxLength(500) ]],
      startDate:[this.formData.startDate, [Validators.required ]],
      endDate:[this.formData.endDate, []],
      organization:[this.formData.organization, []],
      roleposition:[this.formData.roleposition, []],


    });

    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
    this.seleccionadoOrga = this.formData.organization
    this.seleccionadoRole = this.formData.roleposition
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

  compararOrganizacion(myOrganization1:Organization, myOrganization2:Organization) {
    if (myOrganization1==null || myOrganization2==null) {
      return false;
    } else {
      return myOrganization1.name === myOrganization2.name;
    }
  }
  compararRoles(myRolePosition1:RolePosition, myRolePosition2:RolePosition) {
    if (myRolePosition1==null || myRolePosition2==null) {
      return false;
    } else {
      return myRolePosition1.name === myRolePosition2.name;
    }
  }

  resetForm() {
    this.formData.resume = "";
    this.formData.startDate = new Date();
    this.formData.endDate = new Date();
  }

  
  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      console.log(this.form.valid, this.form.get("since")?.value)
      if (this.form.valid) {
  
        this.formData.resume = this.form.get("resume")?.value;
        this.formData.startDate = this.form.get("startDate")?.value;
        this.formData.endDate = this.form.get("endDate")?.value;
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


}
