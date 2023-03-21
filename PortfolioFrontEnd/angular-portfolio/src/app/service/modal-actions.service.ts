import { Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Interest } from '../models';

import { DataService } from '../service/data.service'


@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {
  // Si el message-box se acepta la accion, este flag cambiará su estado
  private flagBorrado: boolean = false;
  private flagBorrado$ = new Subject<boolean>();
  private oldData: any;

  constructor(
    private dataservice: DataService, 

    ) { }
    
  // Hago el cambio de status en un subject bajo observacion.
  // PENDIENTE, REPENSAR ESTE OBSERVABLE, DERROCHA RECURSOS
  // NO SE REQUIERE QUE SEA OBSERVABLE
  // DEBE SER UN FLAG PARA CADA ENTIDAD, SINO SE EJECUTA EN
  // TODAS LAS ENTIDADES, CUANDO SE ACEPTA EL BORRARO DE ALGUNA
  // IMPLEMENTE SOLUCION DE COMPROMISO, PONIENDOLE DOBLE CONDICION
  // EN CADA COMPONENTE Y BLANQUEANDO LA VARIABLE ITEMPARABORRAR
  toggleFlagBorrado(value:boolean) {
    this.flagBorrado = value;
    this.flagBorrado$.next(this.flagBorrado);
  }
  
  // getter del flag de seguimiento de la opcion elegida
  getFlagBorrado$(): Observable<boolean> {
    return this.flagBorrado$.asObservable();
  }


  modalAction(modalData: any) {
    // Clono el objeto, uso assign por no tener atributos compuestos por otros objetos
    // this.oldData = Object.assign({} , modalData.data)

    switch (modalData.name) {

      // Confirma que eliminará un objeto relacionado con Person entity, 
      // El flag de confirmacion de borrado es observable en [entity].component.ts
      case "eliminar":
        this.toggleFlagBorrado(true);
        break;
          
      // case "delInterest":
      //   this.deleteInterest(modalData, this.oldData);
      //   break;

      // case "delSoftSkill":
      //   this.deleteSoftskill(modalData);
      //   break;
      
      // case "delHardSkill":
      //   this.deleteHardSkills(modalData);
      //   break;
      
      // case "delProject":
      //   this.deleteProject(modalData);
      //   break;

    //   case "delOrganization":
    //     this.deleteOrganization(modalData);
    //     break;

    //   case "delLaboralCareer":
    //     this.deleteCareer(modalData);
    //     break;

    //   case "delRolePosition":
    //     this.deleteRole(modalData);
    //     break;

    //   case "delDegree":
    //     this.deleteDegree(modalData);
    //     break;

    //   case "delStudie":
    //     this.deleteStudie(modalData);
    //     break;
      
    //   // Modifica atributos de Person entity
    //   case "delProfile":
    //     modalData.data.profile = ""
    //     this.updateData(modalData)
    //     break;
        
    //   case "delObjetive":
    //     modalData.data.objetive = ""
    //     this.updateData(modalData)
    //     break;
        

    //   default:
    //     console.log("ALERTA: en modalAction, No se ha encontrado modalData.name")
    //     break;
    // }

  }

// PENDIENTE ELIMINAR METODOS O DIRECTAMENTE EL SERVICIO
  // private deleteInterest(modalData: any, interest: Interest) {
  //   console.log("Se abre el modal de deleteInterest del modal-action, para eliminar a: ", this.oldData)
  //   // Llamada al metodo de data.service.ts
  //   this.dataservice.delInterests(modalData.data).subscribe( {
  //     next: (v) => {
  //       console.log("Se ha eliminado exitosamente a: ", interest);
  //       this.toggleFlagBorrado(true);
  //     },
  //     error: (e) => {
  //       alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
  //       console.log("Se quizo eliminar sin exito a: ", modalData.data);
  //       modalData.data = this.oldData;
  //       this.toggleFlagBorrado(false);
        
  //     },
  //     complete: () => console.log("Completada la actualizacion del interes")
  //   } );
  // }

  // private deleteSoftskill(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delSoftSkill(modalData.data).subscribe()
  // }
  // private deleteHardSkills(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delHardSkills(modalData.data).subscribe()
  // }
  // private deleteProject(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delProject(modalData.data).subscribe()
  // }
  // private deleteOrganization(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delOrganization(modalData.data).subscribe()
  // }
  // private deleteCareer(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delLaboralCareer(modalData.data).subscribe()
  // }
  // private deleteRole(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delRolePosition(modalData.data).subscribe()
  // }
  // private deleteDegree(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delDegree(modalData.data).subscribe()
  // }
  // private deleteStudie(modalData: any) {
  //   console.log(modalData.data)
  //   this.dataservice.delStudie(modalData.data).subscribe()
  
  }

  
  private updateData(modalData: any) {
    console.log(modalData.data)
    this.dataservice.updateGralData(modalData.data).subscribe()
  }
}
