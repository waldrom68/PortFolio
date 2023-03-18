import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AdminService } from 'src/app/service/auth.service';
import { BaseDataService } from 'src/app/service/data.service';

import { FullPersonDTO, Interest } from '../../../models';

@Component({
  selector: 'app-interests-form',
  templateUrl: './interests-form.component.html',
  styleUrls: ['./interests-form.component.css']
})
export class InterestsFormComponent implements OnInit, OnDestroy {

  @Input() formData: Interest;

  @Input() title:string;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<Interest> = new EventEmitter()
  @Output() cancel: EventEmitter<Interest> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  form: FormGroup;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  constructor( 
    private formBuilder: FormBuilder,

    private adminService: AdminService,
    private baseDataService: BaseDataService,
    ) { 
    
  }

  ngOnInit() {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
    
    this.form = this.formBuilder.group({
      name:[this.formData.name, [Validators.required,
        Validators.minLength(5) ]],
    });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    // Inicializo en falso, porque ingreso directamente en un formulario
    this.showBtnAction = false;
    this.showBtnActionChange.emit(this.showBtnAction)

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  get Name(): any {
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
        this.formData.person = this.baseData.id
        // estoy por cerrar el formulario, emito orden de actualizarse
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
