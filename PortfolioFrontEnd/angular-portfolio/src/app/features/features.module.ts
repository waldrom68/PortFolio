import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BloqueDatosObjProfileComponent } from './bloque-datos-obj-profile/bloque-datos-obj-profile.component';
import { BloqueFormacionSkillIntComponent } from './bloque-formacion-skill-int/bloque-formacion-skill-int.component';
// import { PersonalCardComponent } from './personal-card/personal-card.component';

import { DatosTrayectoriaComponent } from './datos-trayectoria/datos-trayectoria.component';
import { ProfileComponent } from './profile/profile.component';
import { ObjetiveComponent } from './objetive/objetive.component';
import { DataComponent } from './bloque-datos-obj-profile/data-personal/data.component';
import { DatosFormacionComponent } from './bloque-formacion-skill-int/datos-formacion/datos-formacion.component';
import { FormacionItemComponent } from './bloque-formacion-skill-int/formacion-item/formacion-item.component';

import { InterestsItemComponent } from './bloque-formacion-skill-int/interests-item/interests-item.component';
import { HardItemComponent } from './bloque-formacion-skill-int/hard-item/hard-item.component';
import { ProjectsItemComponent } from './bloque-formacion-skill-int/projects-item/projects-item.component';
import { SoftItemComponent } from './bloque-formacion-skill-int/soft-item/soft-item.component';

// import { SoftSkillsComponent } from './bloque-formacion-skill-int/soft-skills/soft-skills.component';
// import { HardSkillsComponent } from './hard-skills/hard-skills.component';






@NgModule({
  declarations: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    // PersonalCardComponent,
    // DatosTrayectoriaComponent,
    // ProfileComponent,
    // ObjetiveComponent,
    DataComponent,
    // DatosFormacionComponent,
    // FormacionItemComponent,

    // InterestsItemComponent,
    // HardItemComponent,
    // ProjectsItemComponent,
    // SoftItemComponent,
    // InteresItemComponent,

    // SoftSkillsComponent,
    // HardSkillsComponent,
    // InteresesComponent,
  ],
  
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
  ],

  exports: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    // SoftItemComponent,
    // PersonalCardComponent,
    // FontAwesomeModule
  ]

})
export class FeaturesModule { }
