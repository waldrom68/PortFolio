import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BloqueDatosObjProfileComponent } from './bloque-datos-obj-profile/bloque-datos-obj-profile.component';
import { BloqueFormacionSkillIntComponent } from './bloque-formacion-skill-int/bloque-formacion-skill-int.component';
import { PersonalCardComponent } from './personal-card/personal-card.component';

import { DatosTrayectoriaComponent } from './bloque-datos-obj-profile/datos-trayectoria/datos-trayectoria.component';
import { ProfileComponent } from './bloque-datos-obj-profile/profile/profile.component';
import { ObjetiveComponent } from './bloque-datos-obj-profile/objetive/objetive.component';
import { DataComponent } from './bloque-datos-obj-profile/data-personal/data.component';
import { DatosFormacionComponent } from './bloque-formacion-skill-int/datos-formacion/datos-formacion.component';
import { FormacionItemComponent } from './bloque-formacion-skill-int/formacion-item/formacion-item.component';
import { SoftSkillsComponent } from './bloque-formacion-skill-int/soft-skills/soft-skills.component';
import { SoftItemComponent } from './bloque-formacion-skill-int/soft-item/soft-item.component';
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
    FormacionItemComponent,
    SoftSkillsComponent,
    SoftItemComponent,
    HardSkillsComponent,
    HardItemComponent,
    InteresesComponent,
    InteresItemComponent,
  ],
  
  imports: [
    CommonModule,
    FontAwesomeModule,

  ],

  exports: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    PersonalCardComponent,
    // FontAwesomeModule
  ]

})
export class FeaturesModule { }
