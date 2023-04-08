import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

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
    // private modalService: ModalActionsService,
  ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "modal-warn";
    dialogConfig.disableClose = false;

    modalData.url = modalData.url ? modalData.url : '';

    if (modalData.timer > 0 ) {
      this.delay(modalData.timer);
    }

  }

  ngOnInit() {
    // console.log("iniciando el message-box")
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
