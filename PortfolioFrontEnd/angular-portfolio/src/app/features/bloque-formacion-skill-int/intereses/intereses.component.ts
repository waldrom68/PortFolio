import { Component, OnInit } from '@angular/core';

import {Intereses} from '../../../data'
import {INTERESES} from '../../../mock-data'

@Component({
  selector: 'app-intereses',
  templateUrl: './intereses.component.html',
  styleUrls: ['./intereses.component.css']
})
export class InteresesComponent implements OnInit {
  intereses: Intereses[] = INTERESES;
  constructor() { }

  ngOnInit(): void {
  }

}
