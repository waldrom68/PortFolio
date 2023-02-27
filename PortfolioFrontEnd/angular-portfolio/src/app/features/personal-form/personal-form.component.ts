import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';

import { faCheck, faMonument, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

// import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FullPersonDTO } from 'src/app/models';

import { formatDate } from '@angular/common';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent  implements OnInit {

// SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
flagUserAdmin: boolean = false;
flagUserAdmin$: Observable<boolean>;

faCheck = faCheck;
faTimes = faTimes;

form: FormGroup;
oldForm: FormGroup;
myData: FullPersonDTO;
message: String;

constructor(    
  private fb: FormBuilder,
  private dataService: DataService,
  private matDialog: MatDialog,
  
  @Inject(MAT_DIALOG_DATA) data: { message: string, form:FormGroup },

  public dialogRef: MatDialogRef<PersonalFormComponent>) 
  {
    this.message = data ? data.message :"Falta definir el Titulo";
    this.myData = this.dataService.getData();

    this.form = this.fb.group(
      {
        name:[this.myData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(45)  ]],
        lastName:[this.myData.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(45) ]],
        location:[this.myData.location, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
        profession:[this.myData.profession, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
        pathFoto:[this.myData.pathFoto, [Validators.required ]],
        email:[this.myData.email, [Validators.required, Validators.email ]],
        since: [formatDate(this.myData.since, 'yyyy-MM-dd', 'en'), [Validators.required ]],
      }
    )
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldForm = Object.assign({} , this.form)

  }

  ngOnInit(): void {
    // this.myData = this.dataService.getData();

    // Verifica si está logueado como ADMIN
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
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
  get PathFoto(): any {
    return this.form.get("pathFoto")
  }
  get Email(): any {
    return this.form.get("email")
  }
  get Since(): any {
    return this.form.get("since")
  }

  submit(form: NgForm) {
    console.log("estoy cerrando el formulario")
    console.log( "Valores del formulario original", this.oldForm )

    this.dialogRef.close({
      clicked: 'submit',
      form: form
    });

    // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
    
    console.log("this.flagUserAdmin", this.flagUserAdmin)
    console.log("this.form.valid", this.form.valid)
    console.log("this.oldForm.value == this.form.value", this.oldForm.value == this.form.value)
    if (this.flagUserAdmin) {

      if (this.form.valid) {
  
        this.myData.name = this.form.get("name")?.value.trim();
        this.myData.lastName = this.form.get("lastName")?.value.trim();

        this.myData.location = this.form.get("location")?.value.trim();
        this.myData.profession = this.form.get("profession")?.value.trim();
        this.myData.pathFoto = this.form.get("pathFoto")?.value;
        this.myData.email = this.form.get("email")?.value.trim();
        this.myData.since = this.form.get("since")?.value;
        console.log( "Valores del formulario devuelto", this.form )
        // this.toggleForm();
        // this.onUpdate.emit(this.myData);
  
      }
       else {
        
        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();
  
      }
    }
  }

  // onSubmit(event: Event, ){
  //   event.preventDefault;
  //   // Si deja de estar logueado, no registro lo que haya modificado y cierro form.
  //   console.log("Debiera volver y cerrar el formulario modal VERIFICANDO cambios")
  //   if (!this.flagUserAdmin) {

  //     this.cancel.emit();

  //   } else {
      
  //     if (this.form.valid) {
  
  //       this.formData.name = this.form.get("name")?.value.trim();
  //       this.formData.lastName = this.form.get("lastName")?.value.trim();

  //       this.formData.location = this.form.get("location")?.value.trim();
  //       this.formData.profession = this.form.get("profession")?.value.trim();
  //       this.formData.pathFoto = this.form.get("pathFoto")?.value;
  //       this.formData.email = this.form.get("email")?.value.trim();
  //       this.formData.since = this.form.get("since")?.value;

  //       this.toggleForm();
  //       this.onUpdate.emit(this.formData);
  
  //     } else {
        
  //       console.log("no es valido el valor ingresado")
  //       this.form.markAllAsTouched();
  
  //     }
  //   }
  // }

  // cancelation(event: Event, ) {
  //   console.log("Debiera volver y cerrar el formulario modal sin hacer cambios")
  //   this.cancel.emit();  // cierro el formulario
  // }

}


