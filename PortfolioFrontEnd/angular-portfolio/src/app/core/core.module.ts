import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { TopBarComponent } from './top-bar/top-bar.component';

import { MainComponent } from './main/main.component';
import { DataCardComponent } from '../shared/data-card/data-card.component';
import { PersonalCardComponent } from '../features/personal-card/personal-card.component';

import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    TopBarComponent,
    FooterComponent,
    MainComponent,
    DataCardComponent,
    PersonalCardComponent,
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
    // PersonalCardComponent,
    // FontAwesomeModule
  ]

})

export class CoreModule { }
