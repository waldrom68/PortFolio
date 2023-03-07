import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { Interest } from '../../../models';

@Component({
  selector: 'app-interests-form',
  templateUrl: './interests-form.component.html',
  styleUrls: ['./interests-form.component.css']
})
export class InterestsFormComponent implements OnInit, OnDestroy {

  @Input() formData: Interest;
  @Input() title:string;
  @Output() onUpdate: EventEmitter<Interest> = new EventEmitter()
  @Output() cancel: EventEmitter<Interest> = new EventEmitter()

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
    ) { 
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required,
        Validators.minLength(5) ]],
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

  get Nombre(): any {
    return this.form.get("name")
  }

  resetForm() {
    this.formData = new Interest();
  }
  
  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {
      
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value.trim();
        this.onUpdate.emit(this.formData)
  
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
