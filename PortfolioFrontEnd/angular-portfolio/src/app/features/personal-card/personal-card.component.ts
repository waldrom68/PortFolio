import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import {FullPersonDTO, Person} from '../../models'


import { faPen, faTimes, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';
import { Observable } from 'rxjs';
import { PersonalFormComponent } from '../personal-form/personal-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit {
  // SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario
  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  
  myData: FullPersonDTO;
  
  faPen = faPen;
  faTimes = faTimes;
  faLocationDot = faLocationDot;

  // codigo probando el modal
  dataFromDialog : any;
  form: FormGroup;
  

  
  constructor( 
    private dataService: DataService,
    private matDialog: MatDialog,

    // private fb: FormBuilder,
    
    
    ) { 
      this.myData = this.dataService.getData();

      // this.form = this.fb.group(
      //   {
      //     name:[this.myData.name, [Validators.required, Validators.minLength(2), Validators.maxLength(45)  ]],
      //     lastName:[this.myData.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(45) ]],
      //     location:[this.myData.location, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
      //     profession:[this.myData.profession, [Validators.required, Validators.minLength(5), Validators.maxLength(45) ]],
      //     pathFoto:[this.myData.pathFoto, [Validators.required ]],
      //     email:[this.myData.email, [Validators.required, Validators.email ]],
      //     since:[this.myData.since, [Validators.required ]]
      //   }
      // )
    } 
  
  
    ngOnInit(): void {
      this.myData = this.dataService.getData();

      // Verifica si está logueado como ADMIN
      this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
      this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
      this.flagUserAdmin = this.dataService.getFlagUserAdmin()
    }

    toggleForm() {
      // Cierra el formulario de edicion o creacion
      this.showForm = !this.showForm;
      this.showBtnAction = !this.showBtnAction
    }



    // upDatePerson(person: Person) {
    //   this.dataService.updateGralData(person).subscribe();
    //   this.toggleForm();
    // }

    showPrompt(): void {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.restoreFocus = true;
      dialogConfig.id = "modal-component";
      // dialogConfig.panelClass = "modal-component";
      // dialogConfig.backdropClass = "modal-component"
  
      dialogConfig.height = "80%";
      dialogConfig.width = "90%";

      dialogConfig.data = { message: "Datos generales", }


      const dialogRef = this.matDialog.open( PersonalFormComponent, dialogConfig );
  
      dialogRef.afterClosed().subscribe((data) => {
  
        this.dataFromDialog = data.form;
        if (data.clicked === 'submit') {

          console.log('Sumbit button clicked, mostrando datos del formulario:', data)
          console.log("El formData", this.dataFromDialog )

        }
      });
    }

}
