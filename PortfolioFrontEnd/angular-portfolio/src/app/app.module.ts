import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule} from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UserDataComponent } from './users/user-data/user-data.component'


// import the feature module here so you can add it to the imports array below
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { UsersModule } from './users/users.module';

import { SharedModule } from './shared/shared.module';

import { ModalActionsService } from './service/modal-actions.service';
import { DataService } from './service/data.service';
import { UiService } from './service/ui.service';

import { MatToolbarModule } from '@angular/material/toolbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { MessageBoxComponent } from './shared/message-box/message-box.component';
import { ReactiveFormsModule } from '@angular/forms';
import { interceptorProvider } from './service/interceptor-service';
import { MatDatepickerComponent } from './shared/mat-datepicker/mat-datepicker.component';




const appRouters: Routes = [
  { path: '', component: AppComponent},
  { path: 'user', component: UserDataComponent},
]



@NgModule({
  declarations: [	
    AppComponent, 
    MessageBoxComponent,  
    // ProjectsComponent, 
    // InterestsComponent,
    // DataComponent
   ],
  imports: [

    BrowserModule,
    FontAwesomeModule,  // Catch this module for export to other levels
    HttpClientModule,  // para el uso del servicio que lee la db.json
    RouterModule.forRoot(appRouters, {enableTracing:false}),
    
    SharedModule,
    CoreModule,  // add the Core module here
    FeaturesModule,  // add the features module here
    UsersModule, 
    BrowserAnimationsModule,  // add the Users module here
    
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
  
    ReactiveFormsModule,
  ],
  exports: [
    SharedModule,
    FontAwesomeModule,
   ],

  providers: [ModalActionsService, DataService, UiService, interceptorProvider ],

  bootstrap: [AppComponent],
  entryComponents: [MessageBoxComponent]
})
export class AppModule { }
