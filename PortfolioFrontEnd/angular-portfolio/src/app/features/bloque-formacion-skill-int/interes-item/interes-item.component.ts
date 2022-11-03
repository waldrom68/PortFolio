import { Component, Input, OnInit } from '@angular/core';
import { Intereses } from '../../../data'

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-interes-item',
  templateUrl: './interes-item.component.html',
  styleUrls: ['./interes-item.component.css']
})
export class InteresItemComponent implements OnInit {
  @Input() item: Intereses;
  
  faTimes = faTimes;
  
  constructor() { }

  ngOnInit(): void {
  }

}
