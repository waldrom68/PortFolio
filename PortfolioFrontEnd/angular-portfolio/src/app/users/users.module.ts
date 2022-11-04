import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserDataComponent } from './user-data/user-data.component';
import { UserDataItemComponent } from './user-data-item/user-data-item.component';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    UserDataComponent,
    UserDataItemComponent,
    // 'FontAwesomeModule' is declared in node_modules/@fortaw.. => no se declara aqui
    // FontAwesomeModule 
  ],
  exports: [
    UserDataComponent,
    FontAwesomeModule
  ]
})
export class UsersModule { }
