import { Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DataService } from '../service/data.service'


@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {
  // Si el message-box se acepta la accion, este flag cambiará su estado
  private flagBorrado: boolean = false;
  private flagBorrado$ = new Subject<boolean>();


  constructor(
    private dataservice: DataService, 

    ) { }
    
  // Hago el cambio de status en un subject bajo observacion.
  toggleFlagBorrado() {
    this.flagBorrado = true;
    this.flagBorrado$.next(this.flagBorrado);
  }
  
  // getter del flag de seguimiento de la opcion elegida
  getFlagBorrado$(): Observable<boolean> {
    return this.flagBorrado$.asObservable();
  }


  modalAction(modalData: any) {
    switch (modalData.name) {

      case "delProfile":
        modalData.data.profile = ""
        this.updateData(modalData)
        break;
        
      case "delObjetive":
        modalData.data.objetive = ""
        this.updateData(modalData)
        break;

      case "delInterest":
        this.deleteInterest(modalData);
        break;
      
      case "delSoftSkill":
        this.deleteSoftskill(modalData);
        break;
      
      case "delHardSkill":
        this.deleteHardSkills(modalData);
        break;
      
      case "delProject":
        this.deleteProject(modalData);
        break;

      case "delOrganization":
        this.deleteOrganization(modalData);
        break;

      case "delLaboralCareer":
        this.deleteCareer(modalData);
        break;

      case "delRolePosition":
        this.deleteRole(modalData);
        break;

      case "delDegree":
        this.deleteDegree(modalData);
        break;

      case "delStudie":
        this.deleteStudie(modalData);
        break;

      default:
        console.log("ALERTA: en modalAction, No se ha encontrado modalData.name")
        break;
    }
  }


  private deleteInterest(modalData: any) {
    // Llamada al metodo de data.service.ts
    this.dataservice.delInterests(modalData.data).subscribe( )
  }
  private updateData(modalData: any) {
    console.log(modalData.data)
    this.dataservice.updateGralData(modalData.data).subscribe()
  }
  private deleteSoftskill(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delSoftSkill(modalData.data).subscribe()
  }
  private deleteHardSkills(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delHardSkills(modalData.data).subscribe()
  }
  private deleteProject(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delProject(modalData.data).subscribe()
  }
  private deleteOrganization(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delOrganization(modalData.data).subscribe()
  }
  private deleteCareer(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delLaboralCareers(modalData.data).subscribe()
  }
  private deleteRole(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delRolePosition(modalData.data).subscribe()
  }
  private deleteDegree(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delDegree(modalData.data).subscribe()
  }
  private deleteStudie(modalData: any) {
    console.log(modalData.data)
    this.dataservice.delStudie(modalData.data).subscribe()
  }
}
