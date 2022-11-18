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
import { InteresesComponent } from '../features/intereses/intereses.component';
import { InteresItemComponent } from '../features/bloque-formacion-skill-int/interes-item/interes-item.component';
import { HardSkillsComponent } from '../features/hard-skills/hard-skills.component';
import { HardItemComponent } from '../features/bloque-formacion-skill-int/hard-item/hard-item.component';



@NgModule({
  declarations: [
    TopBarComponent,
    FooterComponent,
    MainComponent,
    DataCardComponent,
    PersonalCardComponent,
    SoftSkillsComponent,
    SoftItemComponent,
    InteresesComponent,
    InteresItemComponent,
    HardSkillsComponent,
    HardItemComponent,
    
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
    SoftSkillsComponent,
    SoftItemComponent,
    InteresesComponent,
    InteresItemComponent,

    // PersonalCardComponent,
    // FontAwesomeModule
  ]

})

export class CoreModule { }
