import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    TopBarComponent,
    FooterComponent

  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    TopBarComponent,
    FooterComponent
    // FontAwesomeModule
  ]

})

export class CoreModule { }
