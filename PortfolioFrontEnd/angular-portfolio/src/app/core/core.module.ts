import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


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
import { ProfileComponent } from '../features/profile/profile.component';
import { ObjetiveComponent } from '../features/objetive/objetive.component';
import { DatosTrayectoriaComponent } from '../features/datos-trayectoria/datos-trayectoria.component';
import { FormacionItemComponent } from '../features/bloque-formacion-skill-int/formacion-item/formacion-item.component';
import { CareerItemComponent } from '../features/bloque-datos-obj-profile/career-item/career-item.component';
import { ProfileItemComponent } from '../features/bloque-datos-obj-profile/profile-item/profile-item.component';
import { ObjetiveItemComponent } from '../features/bloque-datos-obj-profile/objetive-item/objetive-item.component';
import { DatosFormacionComponent } from '../features/datos-formacion/datos-formacion.component';

import { InterestsFormComponent } from '../features/bloque-formacion-skill-int/interests-form/interests-form.component';
import { ObjetiveFormComponent } from '../features/bloque-datos-obj-profile/objetive-form/objetive-form.component';
import { SoftFormComponent } from "../features/bloque-formacion-skill-int/soft-form/soft-form.component";




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
        FormacionItemComponent,
        CareerItemComponent,
        ProfileItemComponent,
        ObjetiveItemComponent,
        ObjetiveFormComponent,
        InterestsFormComponent,
        SoftFormComponent
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
        FormacionItemComponent,
        CareerItemComponent,
        ProfileItemComponent,
        ObjetiveItemComponent,
        ObjetiveFormComponent,
        InterestsFormComponent,
        SoftFormComponent
        // InterestsComponent,
        // SoftSkillsComponent,
        // SoftItemComponent,
        // InterestsItemComponent,
        // PersonalCardComponent,
        // FontAwesomeModule
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        
    ]
})

export class CoreModule { }
