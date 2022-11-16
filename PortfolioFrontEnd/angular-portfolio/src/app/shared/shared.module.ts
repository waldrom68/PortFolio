import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MessageBoxComponent } from './message-box/message-box.component';
import { BtnDisplayComponent } from './btn-display/btn-display.component';
import { DataCardComponent } from './data-card/data-card.component';




@NgModule({
  declarations: [
    MessageBoxComponent,
    BtnDisplayComponent,
    DataCardComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    MessageBoxComponent,
    BtnDisplayComponent,
    DataCardComponent,
    FontAwesomeModule

  ]
})
export class SharedModule { }
