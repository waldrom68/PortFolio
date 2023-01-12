import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MessageBoxComponent } from './message-box/message-box.component';

import { BtnDisplayComponent } from './btn-display/btn-display.component';
// import {MatDialogModule} from "@angular/material";
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



const MaterialModules = [
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatCheckboxModule
];

@NgModule({
  declarations: [
    // MessageBoxComponent,
    BtnDisplayComponent,
    MatAlertComponent,
    MatInputPromptComponent,
    // CourseDialogComponent,


  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialModules
  ],
  exports: [
    // MessageBoxComponent,
    BtnDisplayComponent,
    FontAwesomeModule,
    MaterialModules

  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class SharedModule { }


// https://edupala.com/how-to-implement-angular-material-dialog/