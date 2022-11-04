import { Component, Input, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { Users } from '../../data'

@Component({
  selector: 'app-user-data-item',
  templateUrl: './user-data-item.component.html',
  styleUrls: ['./user-data-item.component.css']
})
export class UserDataItemComponent implements OnInit {
  faTimes = faTimes
  
  @Input() user : Users

  
  prueba:string = "User item data"
  constructor() { }
  
  ngOnInit() {

  }

}
