import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalActionsService } from 'src/app/service/modal-actions.service';

@Component({
  selector: 'app-mat-alert',
  templateUrl: './mat-alert.component.html',
  styleUrls: ['./mat-alert.component.css']
})
export class MatAlertComponent implements OnInit {

  // type: string;
  // timer: number;

  constructor(
    public dialogRef: MatDialogRef<MatAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public modalData: any,
    private modalService: ModalActionsService,
  ) {

    modalData.timer = modalData.timer ? modalData.timer : 0;
    modalData.url = modalData.url ? modalData.url : 0;

    if (modalData.timer > 0 ) {
      this.delay(modalData.timer);
    }



  }

  ngOnInit() {
    console.log("iniciando el message-box")
  }

  closeModal(opcion: boolean) {
    // Cierro el modal, no existen otras acciones para realizar;
    this.dialogRef.close(opcion);
  }

  delay(timer: number) {
    if (timer > 0) {

      this.dialogRef.afterOpened().subscribe(() => {
        setTimeout(() => {
          this.dialogRef.close();
        }, timer)
      }
      )

    }
  }

  public accept() {
    this.closeModal(true);
  }

  public decline() {
    // Cerro el cuadro de dialogo;
    this.closeModal(false)
  }

  public dismiss() {
    // Rechazó las acciones a seguir.
    this.closeModal(false)
  }

}
