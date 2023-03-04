import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AdminService, DataService } from 'src/app/service/data.service';

// import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FullPersonDTO, Person } from 'src/app/models';

import { formatDate } from '@angular/common';
import { UploadMediaService } from 'src/app/service/upload-media.service';

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

DATAPORTFOLIO: FullPersonDTO;
message: String;
gralData: Person;

 // Validacion Admin STATUS
 esAdmin: boolean;
 private AdminServiceSubscription: Subscription | undefined;


constructor(    
  private fb: FormBuilder,
  private dataService: DataService,
  
  private adminService: AdminService,
  
  @Inject(MAT_DIALOG_DATA) data: { message: string, form:FormGroup },

  public dialogRef: MatDialogRef<PersonalFormComponent>) 
  {
    this.DATAPORTFOLIO = this.dataService.getData();

    this.message = data ? data.message :"Falta definir el Titulo";

    this.form = this.fb.group(
      {
        name:[this.DATAPORTFOLIO.name, [Validators.required, Validators.minLength(2), Validators.maxLength(45)  ]],
        lastName:[this.DATAPORTFOLIO.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(45) ]],
        location:[this.DATAPORTFOLIO.location, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
        profession:[this.DATAPORTFOLIO.profession, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
        // pathFoto:[this.DATAPORTFOLIO.pathFoto, [Validators.required ]],
        email:[this.DATAPORTFOLIO.email, [Validators.required, Validators.email ]],
        since: [formatDate(this.DATAPORTFOLIO.since, 'yyyy-MM-dd', 'en'), [Validators.required ]],
      }
    )
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldForm = Object.assign({} , this.form)

  }

  ngOnInit(): void {
    // this.myData = this.dataService.getData();

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

  realChange(form1:FormGroup, form2:FormGroup): any {
    let verifique = 0;
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
    
  
    // PENDIENTE no estoy capturando error de subida del archivo, ni que se arrepeienta de la imagen que subio antes de confirmar.
    if (this.esAdmin && this.form.valid) {

      if (this.realChange(this.form, this.oldForm) != null) {
        this.DATAPORTFOLIO.name = this.form.get("name")?.value.trim();
        this.DATAPORTFOLIO.lastName = this.form.get("lastName")?.value.trim();
        
        this.DATAPORTFOLIO.location = this.form.get("location")?.value.trim();
        this.DATAPORTFOLIO.profession = this.form.get("profession")?.value.trim();
        // this.DATAPORTFOLIO.pathFoto = this.form.get("pathFoto")?.value.trim();
        this.DATAPORTFOLIO.email = this.form.get("email")?.value.trim();
        this.DATAPORTFOLIO.since = this.form.get("since")?.value;

        action = "update";
        data = this.DATAPORTFOLIO;

      } 

    } 

    // Cierro el modal y paso los datos a personalCardComponent
    this.dialogRef.close({
      clicked: action,
      newData: data
    });
  }

}
