import { Component, OnInit } from '@angular/core';

import {Formacion} from '../../../data'
import {FORMACION} from '../../../mock-data'

@Component({
  selector: 'app-datos-formacion',
  templateUrl: './datos-formacion.component.html',
  styleUrls: ['./datos-formacion.component.css']
})
export class DatosFormacionComponent implements OnInit {
  formacion: Formacion[] = FORMACION;

  constructor() { }

  ngOnInit(): void {

  }

}

