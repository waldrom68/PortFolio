import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// import the feature module here so you can add it to the imports array below
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,  // add the feature module here
    FeaturesModule, FontAwesomeModule,  // add the feature module here
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
