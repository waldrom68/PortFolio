import { Injectable } from '@angular/core';

import { DataService } from '../service/data.service'

@Injectable({
  providedIn: 'root'
})
export class ModalActionsService {

  constructor(
    private deleteInterest: DataService,
  ) { }

  modalAction(modalData: any) {
    switch (modalData.name) {
      // case "logout":
      //   this.logout(modalData);
      //   break;
      
      case "deleteProduct":
        this.deleteProduct(modalData);
        break;
        
      default:
        break;
    }
  }

  
  // private logout(modalData: any) {
  //   // Call an authentication service method to logout the user
  //   this.serv1.alertLogout(modalData);
  // }

  private deleteProduct(modalData: any) {
    // Call a service that makes a DELETE HTTP Request to the server for the\
    // given product id
    this.deleteInterest.alertDelete(modalData)
  }

}
