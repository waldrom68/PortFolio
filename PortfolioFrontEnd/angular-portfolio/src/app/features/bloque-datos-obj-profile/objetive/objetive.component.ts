import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-objetive',
  templateUrl: './objetive.component.html',
  styleUrls: ['./objetive.component.css']
})
export class ObjetiveComponent implements OnInit {

  @Input() objetivoObj:any
  @Input() newDatos:any
  


  constructor() { 

  }

  ngOnInit(): void {
    
  }

}
