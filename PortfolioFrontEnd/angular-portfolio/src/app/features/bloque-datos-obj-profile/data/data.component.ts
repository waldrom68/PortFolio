import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  @Input() dataObj: any
  @Input() visibility: any
  
  @Input() newDatos:any

  constructor() { }

  ngOnInit(): void {
  }

}
