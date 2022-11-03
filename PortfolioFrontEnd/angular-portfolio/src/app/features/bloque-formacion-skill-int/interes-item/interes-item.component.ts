import { Component, Input, OnInit } from '@angular/core';
import { Intereses } from '../../../data'

@Component({
  selector: 'app-interes-item',
  templateUrl: './interes-item.component.html',
  styleUrls: ['./interes-item.component.css']
})
export class InteresItemComponent implements OnInit {

  @Input() item: Intereses

  constructor() { }

  ngOnInit(): void {
  }

}
