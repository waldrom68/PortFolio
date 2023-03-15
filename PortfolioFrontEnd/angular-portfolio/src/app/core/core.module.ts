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
import { HardFormComponent } from '../features/bloque-formacion-skill-int/hard-form/hard-form.component';
import { ProjectsFormComponent } from '../features/bloque-formacion-skill-int/projects-form/projects-form.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PersonalFormComponent } from '../features/personal-form/personal-form.component';
import { OrganizationComponent } from '../features/organization/organization.component';
import { OrganizationItemComponent } from '../features/bloque-datos-obj-profile/organization-item/organization-item.component';
import { OrganizationFormComponent } from '../features/bloque-datos-obj-profile/organization-form/organization-form.component';
import { CareerFormComponent } from '../features/bloque-datos-obj-profile//career-form/career-form.component';

import { DegreeComponent } from '../features/degree/degree.component';
import { DegreeItemComponent } from '../features/bloque-datos-obj-profile/degree-item/degree-item.component';
import { DegreeFormComponent } from '../features/bloque-datos-obj-profile/degree-form/degree-form.component';
import { RolePositionComponent } from '../features/role-position/role-position.component';
import { RolepositionFormComponent } from '../features/bloque-datos-obj-profile/roleposition-form/roleposition-form.component';
import { RolepositionItemComponent } from '../features/bloque-datos-obj-profile/roleposition-item/roleposition-item.component';
import { StudieItemComponent } from '../features/bloque-datos-obj-profile/studie-item/studie-item.component';
import { StudieFormComponent } from '../features/bloque-datos-obj-profile/studie-form/studie-form.component';

import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { RefreshDirective } from '../directive/refresh.directive';


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
        SoftFormComponent,
        HardFormComponent,
        ProjectsFormComponent,
        PersonalFormComponent,
        OrganizationComponent,
        OrganizationItemComponent,
        OrganizationFormComponent,
        CareerFormComponent,
        DegreeComponent,
        DegreeItemComponent,
        DegreeFormComponent,
        RolePositionComponent,
        RolepositionFormComponent,
        RolepositionItemComponent,
        StudieItemComponent,
        StudieFormComponent,
        IniciarSesionComponent,
        RefreshDirective, 

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
        SoftFormComponent,
        HardFormComponent,
        ProjectsFormComponent,
        PersonalFormComponent,
        OrganizationComponent,
        OrganizationItemComponent,
        OrganizationFormComponent,
        CareerFormComponent,
        DegreeComponent,
        DegreeItemComponent,
        DegreeFormComponent,
        RolePositionComponent,
        RolepositionFormComponent,
        RolepositionItemComponent,
        StudieItemComponent,
        StudieFormComponent,
        ReactiveFormsModule,
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

        MatDatepickerModule,
        MatNativeDateModule
        
    ]
})

export class CoreModule { }
