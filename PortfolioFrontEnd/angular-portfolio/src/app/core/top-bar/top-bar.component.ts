import { Component, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
// import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit {
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

 
  faTimes = faTimes;
  isLoggin: boolean;

  constructor(
    private dataService: DataService,
    // private tokenService: TokenService,
    private authService: AuthService,
  ) { }

  ngOnInit ( ): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    

    console.log("flagUserAdmin IS ", this.flagUserAdmin )
    // if (this.tokenService.getToken()){
    //   this.isLoggin = true;
    // } else {
    //   this.isLoggin = false;
    // }
   }
  
  onLogOut() {
    // this.dataService.changeUser();
    // this.isLoggin = false;
    this.authService.logout();
    this.dataService.hasCredentials(false);
  }
  // loggin() {
  //   // this.dataService.changeUser();
  //   this.dataService.hasCredentials(true);
  // }
  
  // toggleLoggin() {
  //   // this.isLoggin = true;
  // }
}
