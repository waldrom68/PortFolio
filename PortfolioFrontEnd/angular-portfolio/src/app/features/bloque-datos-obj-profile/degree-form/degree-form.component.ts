import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Degree } from 'src/app/models';

@Component({
  selector: 'app-degree-form',
  templateUrl: './degree-form.component.html',
  styleUrls: ['./degree-form.component.css']
})
export class DegreeFormComponent implements OnInit {
  // SERVICIO VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  @Input() formData: Degree;
  @Input() title: string;
  @Output() onUpdate: EventEmitter<Degree> = new EventEmitter()
  @Output() cancel: EventEmitter<Degree> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(1),Validators.maxLength(45) ]],

    });
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  color:string = 'red';
  
  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }
  get Nombre(): any {
    return this.form.get("name")
  }

  resetForm() {
    this.formData = { 
      id:0, 
      name:"", 
      person:0 }
  }


  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value.trim();
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