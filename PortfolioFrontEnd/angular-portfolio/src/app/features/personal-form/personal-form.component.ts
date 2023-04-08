import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { FormGroup, FormBuilder, Validators, NgForm, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FullPersonDTO } from 'src/app/models';

import { formatDate } from '@angular/common';
// import { UploadMediaService } from 'src/app/service/upload-media.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent  implements OnInit, OnDestroy {

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;
oldForm: FormGroup;

message: String;

 // Validacion Admin STATUS
 esAdmin: boolean;
 private AdminServiceSubscription: Subscription | undefined;
 baseData: FullPersonDTO;
 private BaseDataServiceSubscription: Subscription | undefined;

constructor(    
  private fb: FormBuilder,
  
  private adminService: AdminService,
  private baseDataService: BaseDataService,
  
  
  @Inject(MAT_DIALOG_DATA) data: { message: string, form:FormGroup },
  public dialogRef: MatDialogRef<PersonalFormComponent>) 
  {
    this.message = data ? data.message :"Falta definir el Titulo";
  }

  ngOnInit(): void {
    // this.myData = this.dataService.getData();
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.form = this.fb.group(
      {
        name:[this.baseData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(45)  ]],
        lastName:[this.baseData.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(45) ]],
        profession:[this.baseData.profession, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
        location:[this.baseData.location, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
        urlLocation:[this.baseData.urlLocation, [Validators.required, ]],

        email:[this.baseData.email, [Validators.required, Validators.email ]],
        since: [formatDate(this.baseData.since, 'yyyy-MM-dd', 'en'), [Validators.required ]],
      }
    )
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldForm = Object.assign({} , this.form)

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
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
  get Email(): any {
    return this.form.get("email")
  }
  get Since(): any {
    return this.form.get("since")
  }
  get UrlLocation(): any {
    return this.form.get("urlLocation")
  }

  realChange(form1:FormGroup, form2:FormGroup): any {
    let cambios = new Array();
    let clave: any;
    Object.keys(this.form.controls).forEach((control: string) => {
      const typedControl: AbstractControl = this.form.controls[control];
      if (typedControl.value != this.oldForm.value[control]) {
        clave = control;
        cambios[clave] = {key:control, "newValue": typedControl.value }
      }
      // should log the form controls value and be typed correctly
    });
    console.log(`Hubo concretamente ${Object.keys(cambios).length} cambios`);
    console.log(cambios);
    

    return Object.keys(cambios).length > 0 ? cambios : null;
  }



  onSubmit(form: NgForm) {
    // Si esta logueado como Admin, el formulario valido y realmente hubo cambios preparo info
    // para actualizar datos.
    let action = "cancel";
    let data = null;
    
  
    if (this.esAdmin && this.form.valid) {
      
      // PENDIENTE Debe de existir forma alguna para validar existencia de cambios, yo lo hice artesanal
      // Aqui utilizo un metodo, pero en el resto de los componentes, listo atributos en la evaluacion de
      // la condicion.
      if (this.realChange(this.form, this.oldForm) != null) {
        this.baseData.name = this.form.get("name")?.value.trim();
        this.baseData.lastName = this.form.get("lastName")?.value.trim();
        
        this.baseData.location = this.form.get("location")?.value.trim();
        this.baseData.urlLocation = this.form.get("urlLocation")?.value.trim();
        this.baseData.profession = this.form.get("profession")?.value.trim();
        // this.baseData.pathFoto = this.form.get("pathFoto")?.value.trim();
        this.baseData.email = this.form.get("email")?.value.trim();
        this.baseData.since = this.form.get("since")?.value;

        action = "update";
        data = this.baseData;

      } 

    } 

    // Cierro el modal y paso los datos a personalCardComponent
    this.dialogRef.close({
      clicked: action,
      newData: data
    });
  }

}
