import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BloqueDatosObjProfileComponent } from './bloque-datos-obj-profile/bloque-datos-obj-profile.component';
import { BloqueFormacionSkillIntComponent } from './bloque-formacion-skill-int/bloque-formacion-skill-int.component';
// import { PersonalCardComponent } from './personal-card/personal-card.component';

// import { DatosTrayectoriaComponent } from './datos-trayectoria/datos-trayectoria.component';
// import { ProfileComponent } from './profile/profile.component';
// import { ObjetiveComponent } from './objetive/objetive.component';
import { DataComponent } from './bloque-datos-obj-profile/data-personal/data.component';
// import { DatosFormacionComponent } from './bloque-formacion-skill-int/datos-formacion/datos-formacion.component';
// import { FormacionItemComponent } from './bloque-formacion-skill-int/formacion-item/formacion-item.component';

// import { InterestsItemComponent } from './bloque-formacion-skill-int/interests-item/interests-item.component';
// import { HardItemComponent } from './bloque-formacion-skill-int/hard-item/hard-item.component';
// import { ProjectsItemComponent } from './bloque-formacion-skill-int/projects-item/projects-item.component';
// import { SoftItemComponent } from './bloque-formacion-skill-int/soft-item/soft-item.component';
// import { ObjetiveFormComponent } from './bloque-datos-obj-profile/objetive-form/objetive-form.component';
// import { HardFormComponent } from './bloque-formacion-skill-int/hard-form/hard-form.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
// import { StudieItemComponent } from './bloque-datos-obj-profile/studie-item/studie-item.component';
// import { StudieFormComponent } from './bloque-datos-obj-profile/studie-form/studie-form.component';
// import { RolePositionComponent } from './role-position/role-position.component';
// import { RolepositionFormComponent } from './bloque-datos-obj-profile/roleposition-form/roleposition-form.component';
// import { RolepositionItemComponent } from './bloque-datos-obj-profile/roleposition-item/roleposition-item.component';
// import { DegreeComponent } from './degree/degree.component';
// import { DegreeItemComponent } from './bloque-datos-obj-profile/degree-item/degree-item.component';
// import { DegreeFormComponent } from './bloque-datos-obj-profile/degree-form/degree-form.component';

// import { OrganizationItemComponent } from './bloque-datos-obj-profile/organization-item/organization-item.component';
// import { OrganizationFormComponent } from './bloque-datos-obj-profile/organization-form/organization-form.component';
// import { OrganizationComponent } from './organization/organization.component';
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
    // CourseDialogComponent,
    // StudieItemComponent,
    // StudieFormComponent,
    // RolePositionComponent,
    // RolepositionFormComponent,
    // RolepositionItemComponent,
    // DegreeComponent,
    // DegreeItemComponent,
    // DegreeFormComponent,
    // OrganizationItemComponent,
    // OrganizationFormComponent,
    // OrganizationComponent,
    // HardFormComponent,
    // SoftFormComponent,
    // ObjetiveFormComponent,
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
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],

  exports: [
    BloqueDatosObjProfileComponent,
    BloqueFormacionSkillIntComponent,
    ReactiveFormsModule,
    // ObjetiveFormComponent,
    // SoftItemComponent,
    // PersonalCardComponent,
    // FontAwesomeModule
    
  ]

})
export class FeaturesModule { }
