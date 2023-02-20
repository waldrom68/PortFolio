import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import {Person} from '../../models'


import { faPen, faTimes, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';
import { Observable } from 'rxjs';
import { PersonalFormComponent } from '../personal-form/personal-form.component';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;
  showForm: boolean = false;  // flag para mostrar o no el formulario
  
  // intereses: Intereses[] = INTERESES;
  myData: Person;
  formData: Person;
  
  faPen = faPen;
  faTimes = faTimes;
  faLocationDot = faLocationDot;

   
  // showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  constructor( 
    private dataService: DataService,
    public matDialog: MatDialog,
    // public dialogRef: MatDialogRef<PersonalFormComponent>,
    
    
    
    ) { 
    // this.dataService.getGralData().subscribe(user =>
    //   this.myData = user

    // );
    // Este servicio debiera pasarse a un Observable
    this.myData = this.dataService.getUSER();
    this.formData = this.myData;
  }
  
  ngOnInit(): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  toggleForm() {
    console.log("Muestro el formulario desde el componente")
    this.showForm = !this.showForm;
    // this.openModal(this.formData );
  }

  cancelation() {
    this.toggleForm();
  }

  upDatePerson(person: Person) {
    this.dataService.updateGralData(person).subscribe();
    this.toggleForm();
  }

  // openModal(data:any) {
  //   const dialogConfig = new MatDialogConfig();
  //   // The user can't close the dialog by clicking outside its body
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = "modal-component";
  //   dialogConfig.height = "350px";
  //   dialogConfig.width = "600px";
  //   dialogConfig.data = data;
  //   // https://material.angular.io/components/dialog/overview
  //   const modalDialog = this.matDialog.open(PersonalFormComponent, dialogConfig);
  // }
}
