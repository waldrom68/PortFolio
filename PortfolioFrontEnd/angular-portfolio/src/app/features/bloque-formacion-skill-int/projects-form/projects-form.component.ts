import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { Project } from 'src/app/models';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-projects-form',
  templateUrl: './projects-form.component.html',
  styleUrls: ['./projects-form.component.css'],
})
export class ProjectsFormComponent implements OnInit, OnDestroy {

@Input() formData: Project;
@Input() title: string;
@Output() onUpdate: EventEmitter<Project> = new EventEmitter()
@Output() cancel: EventEmitter<Project> = new EventEmitter()

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;
minSince:string = '2018/03/1';
maxSince:string = '2030/05/1';

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
 

constructor( 
  private formBuilder: FormBuilder,

  private adminService: AdminService,
  ) { 

}

  ngOnInit() {
    if (!this.formData.since) {
      this.formData.since = new Date();
    }
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(1) ]],
      resume:[this.formData.resume, [Validators.required, Validators.minLength(2), Validators.maxLength(500) ]],
      since:[formatDate(this.formData.since, 'yyyy-MM-dd', 'en'), [Validators.required ]],
      url:[this.formData.url ]
    });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
      console.log(this.formData)
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
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
  get Url(): any {
    return this.form.get("url");
  }

  resetForm() {
    this.formData = new Project();

  }

  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {
      
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value.trim();
        this.formData.resume = this.form.get("resume")?.value.trim();
        this.formData.since = this.form.get("since")?.value;
        this.formData.url = this.form.get("url")?.value.trim();
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
