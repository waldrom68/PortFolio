import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
}) 
export class UiService {
  private subject = new Subject<any>();  // para escuchar los eventos del template
  
  private subjectConfirmAction = new Subject<any>(); 


  
  private showConfirmAction: boolean = false;  // muestra o no cuadro de dialogo
  private showAddUser: boolean = false;  // muestra o no el formulario de alta de usuarios



  constructor() { }

  // Es llamado desde el componente user-data, Evento recibido desde: add-button-user.component.html
  toggleAddForm(value:any): void {
    console.log("En ui.service.ts recibo el valor de :", value);
    this.showAddUser = !this.showAddUser;
    this.subject.next(this.showAddUser);
  }

  onToggleAddForm(): Observable<any> {
    return this.subject.asObservable();
  }


   
  toggleConfirmAction(): void {
    console.log("estoy en el servicio toggleConfirmAction")
    this.showConfirmAction = !this.showConfirmAction;
    this.subjectConfirmAction.next(this.showConfirmAction);
  }

  onConfirmAction(): Observable<any> {
    return this.subjectConfirmAction.asObservable();
  }
}