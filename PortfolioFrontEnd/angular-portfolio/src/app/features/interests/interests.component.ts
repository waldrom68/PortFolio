import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {Interests} from '../../data'
// import {INTERESES} from '../../../mock-data'


@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;
  
  // intereses: Intereses[] = INTERESES;
  myData: Interests[] = [];
  formData: Interests;  // instancia vacia, para cuando se solicite un alta
  
  faPlusCircle = faPlusCircle;
  faPen = faPen;

  showForm: boolean = false;  // flag para mostrar o no el formulario
  // ocultarAcciones: boolean = false;
  
  showBtnAction: boolean;  // flag para mostrar o no los btn's de acciones del usuario
  // size = 2
 
 
  constructor( 
    private dataService: DataService,
    ) {
      this.formData = { id:0, name:"", userId:0 }
     }
    
  ngOnInit(): void {
    this.dataService.getInterests().subscribe(interest =>
      [this.myData = interest]
    );

    if (this.isAdmin) {
      this.showBtnAction = true 
    } else {
      this.showBtnAction = false
    }

  }

   
  toggleForm() {
    this.showForm = !this.showForm;
    // if (this.size == 8) {
    //   this.size = 2
    // } else { this.size = 8;}
    this.showBtnAction = !this.showBtnAction
  }

  deleteInterest(interest: Interests) {
    // Este codigo acualiza el array Users para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
     this.dataService.delInterests(interest).subscribe( (tt)=> {
        // despues de ejecutarse el borrado de la DB, la quitamos del listado de myData
        this.myData = this.myData.filter( (t) => { return t.id !== interest.id } )
      }
    );
  }

  cancelation(interest: Interests) {
    this.toggleForm();
  }

  upDateInterest(interest: Interests) {
    this.dataService.updateInterest(interest).subscribe();
  }

  addInterest(interest: Interests) {

    this.dataService.addInterests(interest).subscribe( (tt)=> {
        this.myData.push( tt );
        this.toggleForm();
      }
    );
 }

}
