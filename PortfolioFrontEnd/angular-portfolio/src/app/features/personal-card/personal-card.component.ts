import { Component, Input, OnInit } from '@angular/core';

import {Person} from '../../data'


import { faPen, faTimes, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';
import { Observable } from 'rxjs';

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
  
  faPen = faPen;
  faTimes = faTimes;
  faLocationDot = faLocationDot;

   
  // showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  constructor( private dataService: DataService, ) { 
    this.dataService.getGralData().subscribe(user =>
      this.myData = user

    );
  }
  
  ngOnInit(): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
  }

  toggleForm() {
    console.log("Muestro el formulario desde el componente")
    this.showForm = !this.showForm;
  }

  cancelation() {
    this.toggleForm();
  }

  upDatePerson(person: Person) {
    this.dataService.updateGralData(person).subscribe();
    this.toggleForm();
  }

}
