import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloque-datos-obj-profile',
  templateUrl: './bloque-datos-obj-profile.component.html',
  styleUrls: ['./bloque-datos-obj-profile.component.css']
})

export class BloqueDatosObjProfileComponent implements OnInit {

  name:string = "Walter";
  last_name:string = "Romero";
  foto:string = "../assets/images/ico.svg";

  since:string = "1968"
  location:string = "Bernal, Bs.As. Argentina."
  profession:any = ["Full Stack Developer","PYTHON - JAVA"]


  constructor() { }

  ngOnInit(): void {
  }

}
