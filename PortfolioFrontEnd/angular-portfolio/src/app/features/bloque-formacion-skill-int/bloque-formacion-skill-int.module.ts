import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosFormacionComponent } from './datos-formacion/datos-formacion.component';



@NgModule({
  declarations: [
    DatosFormacionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatosFormacionComponent,
  ]

})

export class BloqueFormacionSkillIntModule { }