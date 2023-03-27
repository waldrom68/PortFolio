import { Component, OnInit } from '@angular/core';

import {Data} from '../../../models'
import {DATA} from '../../../../assets/data/mock-data'

import { faTimes } from '@fortawesome/free-solid-svg-icons';



// PENDIENTE, este componente al final no lo estoy usando
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  // data: Data = Person;
  faTimes = faTimes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
