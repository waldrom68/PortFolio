import { Component, Input, OnInit } from '@angular/core';


import {Data} from '../../../data'
import {DATA} from '../../../mock-data'

@Component({
  selector: 'app-objetive',
  templateUrl: './objetive.component.html',
  styleUrls: ['./objetive.component.css']
})
export class ObjetiveComponent implements OnInit {

  data: Data = DATA

  constructor() { 

  }

  ngOnInit(): void {
    
  }

}
