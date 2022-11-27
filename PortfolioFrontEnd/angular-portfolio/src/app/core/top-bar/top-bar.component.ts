import { Component, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit {
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;


  faTimes = faTimes;

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit ( ): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)

  }
  
  
  loggin() {
    this.dataService.changeUser();
    
  }

}
