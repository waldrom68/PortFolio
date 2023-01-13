import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-alert',
  templateUrl: './mat-alert.component.html',
  styleUrls: ['./mat-alert.component.css']
})
export class MatAlertComponent {
  message: string = '';

  constructor(private dialogRef: MatDialogRef<MatAlertComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }) {
    this.message = data ? data.message : '';
    
  }

  closeAlert() {
    this.dialogRef.close();
  }

}
