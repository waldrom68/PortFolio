import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MessageBoxComponent } from './message-box/message-box.component';
import { BtnDisplayComponent } from './btn-display/btn-display.component';





@NgModule({
  declarations: [
    MessageBoxComponent,
    BtnDisplayComponent,


  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    MessageBoxComponent,
    BtnDisplayComponent,
    FontAwesomeModule

  ]
})
export class SharedModule { }
