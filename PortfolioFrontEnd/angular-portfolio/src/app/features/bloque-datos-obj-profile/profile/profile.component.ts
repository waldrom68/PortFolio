import { Component, Input, OnInit } from '@angular/core';


import {Data} from '../../../data'
import {DATA} from '../../../mock-data'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  data: Data = DATA
  

  // miPerfil:string[] = newDatos.perfil.split('\n');
  constructor() { }

  ngOnInit(): void {

  }

}
