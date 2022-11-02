import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { BloqueDatosObjProfileComponent } from './features/bloque-datos-obj-profile/bloque-datos-obj-profile.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements AfterViewInit {
  @ViewChild(BloqueDatosObjProfileComponent) child:any;

  title = 'angular-portfolio';

  parentMessage = "message from parent: AppComponent"
  message:string;

  ngAfterViewInit() {
    this.message = this.child.message
  }
  
}
