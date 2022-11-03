import { Component, Input, OnInit } from '@angular/core';
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons';

import { HardSkill } from '../../../data';

@Component({
  selector: 'app-hard-item',
  templateUrl: './hard-item.component.html',
  styleUrls: ['./hard-item.component.css']
})
export class HardItemComponent implements OnInit {

  faTimes = faTimes;
  faPen = faPen;
  @Input() item: HardSkill

  constructor() { }

  ngOnInit(): void {
  }

}
