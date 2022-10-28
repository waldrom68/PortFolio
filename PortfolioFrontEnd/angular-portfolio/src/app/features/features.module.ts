import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { DatosTrayectoriaComponent } from './datos-trayectoria/datos-trayectoria.component';
import { DatosFormacionComponent } from './datos-formacion/datos-formacion.component';
import { DatosHabilidadesComponent } from './datos-habilidades/datos-habilidades.component';



@NgModule({
  declarations: [
    DatosPersonalesComponent,
    DatosTrayectoriaComponent,
    DatosFormacionComponent,
    DatosHabilidadesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DatosPersonalesComponent,
    DatosTrayectoriaComponent,
    DatosFormacionComponent,
    DatosHabilidadesComponent
  ]

})
export class FeaturesModule { }
