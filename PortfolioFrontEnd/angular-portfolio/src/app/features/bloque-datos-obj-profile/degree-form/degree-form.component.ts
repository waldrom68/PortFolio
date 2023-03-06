import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { Degree } from 'src/app/models';

@Component({
  selector: 'app-degree-form',
  templateUrl: './degree-form.component.html',
  styleUrls: ['./degree-form.component.css']
})
export class DegreeFormComponent implements OnInit, OnDestroy {

  @Input() formData: Degree;
  @Input() title: string;
  @Output() onUpdate: EventEmitter<Degree> = new EventEmitter()
  @Output() cancel: EventEmitter<Degree> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;
  
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private adminService: AdminService,

  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required, Validators.minLength(1),Validators.maxLength(45) ]],

    });
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

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

  resetForm() {
    this.formData = new Degree();
  }


  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

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