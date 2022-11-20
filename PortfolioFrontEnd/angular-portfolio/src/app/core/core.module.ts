import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { TopBarComponent } from './top-bar/top-bar.component';

import { MainComponent } from './main/main.component';
import { DataCardComponent } from '../shared/data-card/data-card.component';
import { PersonalCardComponent } from '../features/personal-card/personal-card.component';
import { SoftSkillsComponent } from '../features/soft-skills/soft-skills.component';
import { SoftItemComponent } from '../features/bloque-formacion-skill-int/soft-item/soft-item.component';

import { FooterComponent } from './footer/footer.component';


import { HardSkillsComponent } from '../features/hard-skills/hard-skills.component';
import { HardItemComponent } from '../features/bloque-formacion-skill-int/hard-item/hard-item.component';
import { InterestsComponent } from '../features/interests/interests.component';
import { InterestsItemComponent } from '../features/bloque-formacion-skill-int/interests-item/interests-item.component';
import { ProjectsItemComponent } from '../features/bloque-formacion-skill-int/projects-item/projects-item.component';
import { ProjectsComponent } from '../features/projects/projects.component';
import { ProfileComponent } from '../features/bloque-datos-obj-profile/profile/profile.component';
import { ObjetiveComponent } from '../features/bloque-datos-obj-profile/objetive/objetive.component';
import { DatosTrayectoriaComponent } from '../features/bloque-datos-obj-profile/datos-trayectoria/datos-trayectoria.component';
import { DatosFormacionComponent } from '../features/bloque-formacion-skill-int/datos-formacion/datos-formacion.component';



@NgModule({
  declarations: [
    TopBarComponent,
    FooterComponent,
    MainComponent,
    DataCardComponent,
    PersonalCardComponent,
    ProfileComponent,
    ObjetiveComponent,
    DatosTrayectoriaComponent,
    DatosFormacionComponent,

    HardSkillsComponent,
    SoftSkillsComponent,
    InterestsComponent,
    ProjectsComponent,

    InterestsItemComponent,
    SoftItemComponent,
    HardItemComponent,
    ProjectsItemComponent,
    
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    // PersonalCardComponent,
  ],
  exports: [
    TopBarComponent,
    FooterComponent,
    MainComponent,
    DataCardComponent,
    ProfileComponent,
    ObjetiveComponent,
    DatosTrayectoriaComponent,
    DatosFormacionComponent,

    // InterestsComponent,
    // SoftSkillsComponent,

    // SoftItemComponent,
    // InterestsItemComponent,
    // PersonalCardComponent,

    // FontAwesomeModule
  ]

})

export class CoreModule { }
