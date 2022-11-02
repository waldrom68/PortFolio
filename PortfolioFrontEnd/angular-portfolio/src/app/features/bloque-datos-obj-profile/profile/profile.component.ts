import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() newDatos:any
  

  // miPerfil:string[] = newDatos.perfil.split('\n');
  constructor() { }

  ngOnInit(): void {

  }

}
