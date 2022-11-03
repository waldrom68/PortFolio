import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BloqueDatosObjProfileComponent } from './bloque-datos-obj-profile/bloque-datos-obj-profile.component';
import { BloqueFormacionSkillIntComponent } from './bloque-formacion-skill-int/bloque-formacion-skill-int.component';
import { PersonalCardComponent } from './personal-card/personal-card.component';

import { DatosTrayectoriaComponent } from './bloque-datos-obj-profile/datos-trayectoria/datos-trayectoria.component';
import { ProfileComponent } from './bloque-datos-obj-profile/profile/profile.component';
import { ObjetiveComponent } from './bloque-datos-obj-profile/objetive/objetive.component';
import { DataComponent } from './bloque-datos-obj-profile/data-personal/data.component';
import { DatosFormacionComponent } from './bloque-formacion-skill-int/datos-formacion/datos-formacion.component';
import { SoftSkillsComponent } from './bloque-formacion-skill-int/soft-skills/soft-skills.component';
import { HardSkillsComponent } from './bloque-formacion-skill-int/hard-skills/hard-skills.component';
import { HardItemComponent } from './bloque-formacion-skill-int/hard-item/hard-item.component';
import { InteresesComponent } from './bloque-formacion-skill-int/intereses/intereses.component';
import { InteresItemComponent } from './bloque-formacion-skill-int/interes-item/interes-item.component';





@NgModule({
  declarations: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    PersonalCardComponent,
    DatosTrayectoriaComponent,
    ProfileComponent,
    ObjetiveComponent,
    DataComponent,
    DatosFormacionComponent,
    SoftSkillsComponent,
    HardSkillsComponent,
    HardItemComponent,
    InteresesComponent,
    InteresItemComponent,
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
