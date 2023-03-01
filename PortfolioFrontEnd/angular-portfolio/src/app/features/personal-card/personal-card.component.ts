import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import {FullPersonDTO, Person} from '../../models'


import { faPen, faTimes, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';
import { Observable } from 'rxjs';
import { PersonalFormComponent } from '../personal-form/personal-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadMediaService } from 'src/app/service/upload-media.service';

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

  
  // myData: FullPersonDTO;
  DATAPORTFOLIO: FullPersonDTO;
  
  faPen = faPen;
  faTimes = faTimes;
  faLocationDot = faLocationDot;

  // codigo probando el modal
  dataFromDialog : any;
  form: FormGroup;
  

  
  constructor( 
    private dataService: DataService,
    private matDialog: MatDialog,
    private changeDetectionRef: ChangeDetectorRef,

    // private fb: FormBuilder,
    
    
    ) { 
      // this.DATAPORTFOLIO = this.dataService.getData();
    } 
  
  
    ngOnInit(): void {
      this.DATAPORTFOLIO = this.dataService.getData();

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

    gralDataToPerson(data:FullPersonDTO): Person {
      return new Person(
        data.id,
        data.name,
        data.lastName,
        data.pathFoto,
        data.location,
        data.profession,
        data.profile,
        data.objetive,
        data.since,
        data.email,
        data.displaydata
      )
    }

    openPersonModal(): void {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.restoreFocus = true;
      dialogConfig.id = "modal-component";

      dialogConfig.height = "80%";
      dialogConfig.width = "90%";

      dialogConfig.data = { message: "Datos generales", }

      const dialogRef = this.matDialog.open( PersonalFormComponent, dialogConfig );
  
      dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked === 'update') {

        // Obtengo nuevo objeto para actualizar en la base de datos
        const person = this.gralDataToPerson(data.newData);

        // Actualizo los datos via dataService
        this.dataService.updateGralData(person).subscribe( {
          next: (v) => {
            console.log("Guardado correctamente: ", v);
            // Actualizo la variable observada por el resto de los componentes
            this.dataService.changeGralData(data.newData);
          },
          error: (e) => {
            alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
            console.log("Se quizo modificar sin exito a: " + person.lastName);
          },
          complete: () => console.log("Completado la actualizacion de datos")
        });

      }  // cierro la condicion si action es update
    });  // cierro el afterclosed()
  }  // fin openPersonModal()


}
