import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule} from '../shared/shared.module'
import { MessageBoxComponent } from '../shared/message-box/message-box.component';


import { UserDataComponent } from './user-data/user-data.component';
import { UserDataItemComponent } from './user-data-item/user-data-item.component';
import { AddUserComponent } from './add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule, 
    SharedModule
  ],
  declarations: [
    UserDataComponent,
    UserDataItemComponent,
    AddUserComponent,
    // 'FontAwesomeModule' is declared in node_modules/@fortaw.. => no se declara aqui
    // FontAwesomeModule 
  ],
  exports: [
    // MessageBoxComponent,
    UserDataComponent,
    // FormsModule,
    // FontAwesomeModule
  ]
})
export class UsersModule { }
