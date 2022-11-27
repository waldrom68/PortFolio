import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/data';

import { ModalActionsService } from '../../service/modal-actions.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})


export class MessageBoxComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<MessageBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private modalService: ModalActionsService,
    ) { }


  ngOnInit() {
    console.log("iniciando el message-box")
  }


  closeModal() {
    // Cierro el modal, no existen otras acciones para realizar;
    this.dialogRef.close();
  }

  public accept() {
    // Delego al servicio las acciones a seguir.
    this.modalService.modalAction(this.modalData);
    // Genero un cambio en el Flag del servicio, al ser observable, quien lo llamó se entera del cambio de estado
    this.modalService.toggleFlagBorrado()
    this.closeModal()
  }

  public decline() {
    // Cerro el cuadro de dialogo;
    this.closeModal()
  }

  public dismiss() {
    // Rechazó las acciones a seguir.
    this.closeModal()
  }

 
}
