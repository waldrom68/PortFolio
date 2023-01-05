import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Studie, Organization, Degree, Person } from 'src/app/data';

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
@Input() myDegrees: Degree[];
@Output() onUpdate: EventEmitter<Studie> = new EventEmitter();
@Output() cancel: EventEmitter<Studie> = new EventEmitter();

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;

  constructor(
    private dataService: DataService,
  
    private formBuilder: FormBuilder,

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