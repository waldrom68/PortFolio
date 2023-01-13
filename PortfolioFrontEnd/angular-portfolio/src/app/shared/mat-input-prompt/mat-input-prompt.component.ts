import { Component, Inject, OnInit } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-input-prompt',
  templateUrl: './mat-input-prompt.component.html',
  styleUrls: ['./mat-input-prompt.component.css']
})
export class MatInputPromptComponent {
  form: FormGroup;
  message: String;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { message: string, form:FormGroup },
    public dialogRef: MatDialogRef<MatInputPromptComponent>
    ) { 
      // Si no recibo data {} de donde fue llamado, la configuro aquí
      this.message = data ? data.message :"prueba";
      this.form = data ? data.form: this.fb.group({
        name: ['wadalberto', Validators.required],
        address: ['', Validators.required],
        country: ['']
      });
  }



  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form
    });
  }

}
