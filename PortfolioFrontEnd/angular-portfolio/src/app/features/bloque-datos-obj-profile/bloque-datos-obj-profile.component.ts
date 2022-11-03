import { Component, NgModule, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bloque-datos-obj-profile',
  templateUrl: './bloque-datos-obj-profile.component.html',
  styleUrls: ['./bloque-datos-obj-profile.component.css']
})


export class BloqueDatosObjProfileComponent implements OnInit {
  faTimes = faTimes;
  
  constructor() { }

  ngOnInit(): void {
  }

}


