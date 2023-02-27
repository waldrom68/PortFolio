import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MessageBoxComponent } from './message-box/message-box.component';

import { BtnDisplayComponent } from './btn-display/btn-display.component';
// import {MatDialogModule} from "@angular/material";
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { MatAlertComponent } from './mat-alert/mat-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputPromptComponent } from './mat-input-prompt/mat-input-prompt.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './mat-datepicker/custom-date-formats';
import { MatDatepickerComponent } from './mat-datepicker/mat-datepicker.component';




const MaterialModules = [
  
  MatButtonModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  
];

@NgModule({
  declarations: [
    // MessageBoxComponent,
    BtnDisplayComponent,
    MatAlertComponent,
    MatInputPromptComponent,
    MatDatepickerComponent,
    // CourseDialogComponent,
    
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MaterialModules
  ],
  exports: [
    // MessageBoxComponent,
    BtnDisplayComponent,
    MatDatepickerComponent,
    FontAwesomeModule,
    MaterialModules

  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class SharedModule { }


// https://edupala.com/how-to-implement-angular-material-dialog/