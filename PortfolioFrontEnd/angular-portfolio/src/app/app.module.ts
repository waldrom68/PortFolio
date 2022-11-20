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




// import { ProjectsComponent } from './features/projects/projects.component';
// import { InterestsComponent } from './features/interests/interests.component';

const appRouters: Routes = [
  { path: '', component: AppComponent},
  { path: 'user', component: UserDataComponent},
]



@NgModule({
  declarations: [	
    AppComponent, 
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
    UsersModule  // add the Users module here

  ],
  exports: [
    SharedModule,
    FontAwesomeModule,
   ],

  providers: [ModalActionsService, DataService ],

  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
