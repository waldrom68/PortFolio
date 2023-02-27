import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { Project } from 'src/app/models';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css'],
})
export class ProjectsFormComponent implements OnInit {
// SERVICIO VINCULADO CON EL LOGUEO
flagUserAdmin: boolean = false;
flagUserAdmin$: Observable<boolean>;

@Input() formData: Project;
@Input() title: string;
@Output() onUpdate: EventEmitter<Project> = new EventEmitter()
@Output() cancel: EventEmitter<Project> = new EventEmitter()

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;
minSince:string = '2018/03/1';
maxSince:string = '2030/05/1';

constructor( 
  private formBuilder: FormBuilder,
  private dataService: DataService,
  ) { 

}

  ngOnInit() {

    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(1) ]],
      resume:[this.formData.resume, [Validators.required, Validators.minLength(2), Validators.maxLength(500) ]],
      since:[formatDate(this.formData.since, 'yyyy-MM-dd', 'en'), [Validators.required ]]

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
  get Resume(): any {
    return this.form.get("resume")
  }
  get Since(): any {
    return this.form.get("since")
  }

  resetForm() {
    this.formData.name = "";
    this.formData.resume = "";
    this.formData.since = new Date();

  }

  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.flagUserAdmin) {

      this.cancel.emit();

    } else {
      
      console.log(this.form.valid, this.form.get("since")?.value)
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value.trim();
        this.formData.resume = this.form.get("resume")?.value.trim();
        this.formData.since = this.form.get("since")?.value;
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
