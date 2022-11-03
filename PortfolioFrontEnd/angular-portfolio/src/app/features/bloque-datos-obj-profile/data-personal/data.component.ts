import { Component, OnInit } from '@angular/core';

import {Data} from '../../../data'
import {DATA} from '../../../mock-data'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  data: Data = DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
