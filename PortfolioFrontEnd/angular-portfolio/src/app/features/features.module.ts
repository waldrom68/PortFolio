import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { BloqueDatosObjProfileComponent } from './bloque-datos-obj-profile/bloque-datos-obj-profile.component';
import { BloqueFormacionSkillIntComponent } from './bloque-formacion-skill-int/bloque-formacion-skill-int.component';
import { PersonalCardComponent } from './bloque-datos-obj-profile/personal-card/personal-card.component'



@NgModule({
  declarations: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    PersonalCardComponent,
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
