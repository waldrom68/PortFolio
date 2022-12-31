import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Person } from 'src/app/data';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {
// PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
flagUserAdmin: boolean = false;
flagUserAdmin$: Observable<boolean>;

@Input() formData: Person;
@Input() title: string;
@Output() onUpdate: EventEmitter<Person> = new EventEmitter()
@Output() cancel: EventEmitter<Person> = new EventEmitter()

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,

  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(45)  ]],
      lastName:[this.formData.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(45) ]],
      location:[this.formData.location, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
      profession:[this.formData.profession, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
      pathFoto:[this.formData.pathFoto],
      email:[this.formData.email, [Validators.required, Validators.minLength(2), Validators.maxLength(45) ]],
      since:[this.formData.since, [Validators.required ]]

    });

    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  get Name(): any {
    return this.form.get("name")
  }
  get LastName(): any {
    return this.form.get("lastName")
  }
  get Location(): any {
    return this.form.get("location")
  }
  get Profession(): any {
    return this.form.get("profession")
  }
  get PathFoto(): any {
    return this.form.get("pathFoto")
  }
  get Email(): any {
    return this.form.get("email")
  }
  get Since(): any {
    return this.form.get("since")
  }



  onEnviar(event: Event, ){
    console.log("Modificando los datos")
    console.log(event)
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      console.log(this.form.valid, this.form.get("since")?.value)
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value;
        this.formData.lastName = this.form.get("lastName")?.value;
        this.formData.since = this.form.get("since")?.value;
        this.formData.location = this.form.get("location")?.value;
        this.formData.profession = this.form.get("profession")?.value;
        this.formData.pathFoto = this.form.get("pathFoto")?.value;
        this.formData.email = this.form.get("email")?.value;
        this.formData.since = this.form.get("since")?.value;
        this.dataService.updateGralData(this.formData).subscribe();
        // this.onUpdate.emit(this.formData);
  
      } else {
        
        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();
  
      }
    }
  }



}
