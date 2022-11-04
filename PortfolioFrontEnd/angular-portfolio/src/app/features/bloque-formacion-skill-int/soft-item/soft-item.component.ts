import { Component, Input, OnInit } from '@angular/core';
import { SoftSkill } from '../../../data'

import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-soft-item',
  templateUrl: './soft-item.component.html',
  styleUrls: ['./soft-item.component.css']
})
export class SoftItemComponent implements OnInit {
  @Input() item: SoftSkill;
  
  faTimes = faTimes;
  faPen = faPen;
  
  constructor() { }

  ngOnInit() {
  }

}
