import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Custom validation password field, y clase Empleado
import { createPasswordStrengthValidator, datosExperiencia, datosPersonales } from '../features.model';

@Component({
  selector: 'app-bloque-datos-obj-profile',
  templateUrl: './bloque-datos-obj-profile.component.html',
  styleUrls: ['./bloque-datos-obj-profile.component.css']
})


export class BloqueDatosObjProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}


