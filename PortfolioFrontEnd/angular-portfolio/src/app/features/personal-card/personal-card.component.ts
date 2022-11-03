import { Component, Input, OnInit } from '@angular/core';

import {Data} from '../../data'
import {DATA} from '../../mock-data'

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit {

  data:Data = DATA
 
  constructor() { 
  }
  
  ngOnInit(): void {
    
  }

}
