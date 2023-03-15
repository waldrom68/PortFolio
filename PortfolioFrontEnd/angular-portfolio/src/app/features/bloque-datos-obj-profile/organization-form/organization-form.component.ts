import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { Organization } from 'src/app/models';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.css']
})
export class OrganizationFormComponent implements OnInit {

  // @Input() formData: Organization;
  @Input() title: string;
  @Input() item: Organization;

  @Output() onUpdate: EventEmitter<Organization> = new EventEmitter()
  @Output() cancel: EventEmitter<Organization> = new EventEmitter()

  faCheck = faCheck;
  faTimes = faTimes;

  formData: Organization;
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
      name: [this.formData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      resume: [this.formData.resume, [Validators.maxLength(200)]],
      url: [this.formData.url, []]

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

  get Name(): any {
    return this.form.get("name")
  }
  get Resume(): any {
    return this.form.get("resume")
  }
  get Url(): any {
    return this.form.get("url")
  }


  resetForm() {
    this.formData = new Organization();
  }

  onEnviar(event: Event,) {
    event.preventDefault;
    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    if (!this.esAdmin) {

      this.cancel.emit();

    } else {

      if (this.form.valid) {

        this.formData.name = this.form.get("name")?.value.trim();
        this.formData.resume = this.form.get("resume")?.value.trim();
        this.formData.url = this.form.get("url")?.value.trim();
        this.onUpdate.emit(this.formData);

      } else {

        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();

      }
    }

  }
  onCancel(event: Event,) {
    this.cancel.emit();

  }

}
