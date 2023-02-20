import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Organization } from 'src/app/models';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css']
})
export class OrganizationFormComponent implements OnInit {
// PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
flagUserAdmin: boolean = false;
flagUserAdmin$: Observable<boolean>;

@Input() formData: Organization;
@Input() title: string;
@Output() onUpdate: EventEmitter<Organization> = new EventEmitter()
@Output() cancel: EventEmitter<Organization> = new EventEmitter()

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(1),Validators.maxLength(100) ]],
      resume:[this.formData.resume, [Validators.maxLength(200) ]],
      url:[this.formData.url, []]

    });
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  get Nombre(): any {
    return this.form.get("name")
  }
  get Resume(): any {
    return this.form.get("resume")
  }
  get Url(): any {
    return this.form.get("url")
  }

  
  resetForm() {
    this.formData = { 
      id:0, 
      name:"", 
      resume:"",
      url:"",
      person:0 }
  }

  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value;
        this.formData.resume = this.form.get("resume")?.value;
        this.formData.url = this.form.get("url")?.value;
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
