import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BloqueDatosObjProfileComponent } from './bloque-datos-obj-profile/bloque-datos-obj-profile.component';
import { BloqueFormacionSkillIntComponent } from './bloque-formacion-skill-int/bloque-formacion-skill-int.component';
import { PersonalCardComponent } from './bloque-datos-obj-profile/personal-card/personal-card.component';

import { DatosTrayectoriaComponent } from './bloque-datos-obj-profile/datos-trayectoria/datos-trayectoria.component';
import { ProfileComponent } from './bloque-datos-obj-profile/profile/profile.component';
import { ObjetiveComponent } from './bloque-datos-obj-profile/objetive/objetive.component';
import { DataComponent } from './bloque-datos-obj-profile/data/data.component';




@NgModule({
  declarations: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    PersonalCardComponent,
    DatosTrayectoriaComponent,
    ProfileComponent,
    ObjetiveComponent,
    DataComponent,
  ],

  imports: [
    CommonModule,

  ],

  exports: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    PersonalCardComponent,
  ]

})
export class FeaturesModule { }
