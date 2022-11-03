import { Component, Input, OnInit } from '@angular/core';
import { HardSkill } from '../../../data';

@Component({
  selector: 'app-hard-item',
  templateUrl: './hard-item.component.html',
  styleUrls: ['./hard-item.component.css']
})
export class HardItemComponent implements OnInit {

  @Input() item: HardSkill

  constructor() { }

  ngOnInit(): void {
  }

}
