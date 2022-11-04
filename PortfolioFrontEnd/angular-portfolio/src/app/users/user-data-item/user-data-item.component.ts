import { Component, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-user-data-item',
  templateUrl: './user-data-item.component.html',
  styleUrls: ['./user-data-item.component.css']
})
export class UserDataItemComponent implements OnInit {
  faTimes = faTimes
  
  prueba:string = "User item data"
  constructor() { }

  ngOnInit() {
  }

}
