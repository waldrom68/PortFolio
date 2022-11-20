import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';


import {Users} from '../../../data'
// import {DATA} from '../../../mock-data'

@Component({
  selector: 'app-objetive',
  templateUrl: './objetive.component.html',
  styleUrls: ['./objetive.component.css']
})
export class ObjetiveComponent implements OnInit {
  // PENDIENTE DEBE VINCULARSE CON EL LOGUEO
  isAdmin = true;

  // intereses: Intereses[] = INTERESES;
  myData: Users;

  constructor( private dataService: DataService, ) { 
    this.dataService.getGralData().subscribe(user =>
      this.myData = user
    );
  }
  ngOnInit(): void {
    
  }

}
