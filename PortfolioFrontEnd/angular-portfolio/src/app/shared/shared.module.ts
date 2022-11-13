import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ],
  exports: [
    MessageBoxComponent,
    BtnDisplayComponent,
    DataCardComponent

  ]
})
export class SharedModule { }
