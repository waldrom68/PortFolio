import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosFormacionComponent } from './datos-formacion/datos-formacion.component';



@NgModule({
  declarations: [
    DatosFormacionComponent
  ],
  imports: [
    CommonModule,
    DatosFormacionComponent
  ],
  exports: [
    DatosFormacionComponent,
  ]

})

export class BloqueFormacionSkillIntModule { }