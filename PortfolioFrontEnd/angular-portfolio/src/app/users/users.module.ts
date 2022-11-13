import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule} from '../shared/shared.module'


import { UserDataComponent } from './user-data/user-data.component';
import { UserDataItemComponent } from './user-data-item/user-data-item.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CoreModule } from '../core/core.module';

import { AddButtonUserComponent } from './add-button-user/add-button-user.component'

import { MessageBoxComponent } from '../shared/message-box/message-box.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule, 
    SharedModule,
    CoreModule
  ],
  declarations: [
    AddButtonUserComponent,
    AddUserComponent,
    UserDataComponent,
    UserDataItemComponent,
    // 'FontAwesomeModule' is declared in node_modules/@fortaw.. => no se declara aqui
    // FontAwesomeModule 
  ],
  exports: [
    // MessageBoxComponent,
    AddButtonUserComponent,
    UserDataComponent,
    // AddUserComponent,
    // FormsModule,
    // FontAwesomeModule
  ]
})
export class UsersModule { }
