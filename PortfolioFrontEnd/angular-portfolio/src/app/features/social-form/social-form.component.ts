import { Component, EventEmitter, Input, OnDestroy, OnInit, Output }  from '@angular/core';
import { FullPersonDTO, SocialNetwork } from 'src/app/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { AdminService } from 'src/app/service/auth.service';
import { BaseDataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-social-form',
  templateUrl: './social-form.component.html',
  styleUrls: ['./social-form.component.css']
})


export class SocialFormComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() item: SocialNetwork;

  @Input() showBtnAction: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onUpdate: EventEmitter<SocialNetwork> = new EventEmitter()
  @Output() cancel: EventEmitter<SocialNetwork> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  formData: SocialNetwork;
  form: FormGroup;
  
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  constructor(
    private formBuilder: FormBuilder,

    private adminService: AdminService,


  ) { }

  ngOnInit(): void {
 
    if (!this.item) {
      this.resetForm()
 
    } else {
      
      this.formData = this.item;
    }

    this.form = this.formBuilder.group({
      name: [this.formData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      // resume: [this.formData.resume, [Validators.maxLength(200)]],
      iconname: [this.formData.iconname, []],
      url: [this.formData.url, [Validators.required, Validators.minLength(2), Validators.maxLength(250)]]


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

  get Name(): any {
    return this.form.get("name")
  }
  get Url(): any {
    return this.form.get("url")
  }
  get Iconname(): any {
  return this.form.get("iconname")
  }
  
  resetForm() {
    this.formData = new SocialNetwork();
  }
  
  onEnviar(event: Event, ) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {
      
      if (this.form.valid) {
  
        this.formData.name = this.form.get("name")?.value.trim();
        this.formData.iconname = this.form.get("iconname")?.value.trim();
        this.formData.url = this.form.get("url")?.value.trim();
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
