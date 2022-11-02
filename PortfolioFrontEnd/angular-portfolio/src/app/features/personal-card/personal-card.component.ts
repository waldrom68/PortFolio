import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit {

  name:string = "Walter";
  last_name:string = "Romero";
  foto:string = "../assets/images/ico.svg";

  since:string = "1968";
  location:string = "Bernal, Bs.As. Argentina.";
  profession:any = ["Full Stack Developer","PYTHON - JAVA"];

 
 
  @Input() childMessage: string;
  @Input() prueba: string;

  constructor() { 
  }
  
  ngOnInit(): void {
    
  }

}
