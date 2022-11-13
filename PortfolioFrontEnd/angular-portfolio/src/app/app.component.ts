import { Component } from '@angular/core';

import { UiService } from 'src/app/service/ui.service';  // para escuchar el botton de mostrar formulario de alta
import { Subscription } from 'rxjs';  // idem


import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {

  title = 'angular-portfolio';

  faTimes = faTimes;

  showListUsers: boolean = false;
  

constructor(
  // Inicializamos los servicios del modulo User
        private uiService:UiService,  // defino el servicio para el botton de mostrar form

) { }


ngOnInit() {

}


// Eventos recibidos desde: add-button-user.component.html
  // 
  toggleListUser(value:any) {
    // Recibo el metodo y lo relaciono con el uiService.
    console.log("En user-data-compornets.ts recibo el valor de :", value);
    this.showListUsers = !this.showListUsers;
    this.uiService.toggleAddForm(value)
  }

}