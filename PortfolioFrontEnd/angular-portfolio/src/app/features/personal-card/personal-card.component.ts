import { Component, Input, OnInit } from '@angular/core';

import {Data} from '../../data'
import {DATA} from '../../mock-data'

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit {
  faTimes = faTimes;
  data:Data = DATA;
 
  constructor() { 
  }
  
  ngOnInit(): void {
    
  }

}
