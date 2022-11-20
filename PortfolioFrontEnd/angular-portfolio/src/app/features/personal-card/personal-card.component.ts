import { Component, Input, OnInit } from '@angular/core';

import {Users} from '../../data'
// import {DATA} from '../../mock-data'

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // intereses: Intereses[] = INTERESES;
  myData: Users;

  faTimes = faTimes;
  
 
  constructor( private dataService: DataService, ) { 
    this.dataService.getGralData().subscribe(user =>
      this.myData = user

    );
  }
  
  ngOnInit(): void {
    
  }

}
