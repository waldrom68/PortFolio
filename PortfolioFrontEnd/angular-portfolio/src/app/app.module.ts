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

const appRouters: Routes = [
  { path: '', component: AppComponent},
  { path: 'user', component: UserDataComponent},
]



@NgModule({
  declarations: [	
    AppComponent,
   ],
  imports: [
    BrowserModule,
    FontAwesomeModule,  // Catch this module for export to other levels
    HttpClientModule,  // para el uso del servicio que lee la db.json
    RouterModule.forRoot(appRouters, {enableTracing:true}),

    SharedModule,
    CoreModule,  // add the Core module here
    FeaturesModule,  // add the features module here
    UsersModule  // add the Users module here

  ],
  exports: [
    SharedModule,
    FontAwesomeModule,

   ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
