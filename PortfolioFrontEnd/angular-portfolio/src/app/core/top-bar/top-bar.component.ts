import { Component, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';
// import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit {

  faTimes = faTimes;
  isLoggin: boolean;

  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
  colorSubscription: Subscription;
  color: string;
  color$: Observable<string>;
  // FIN A LA PRACTICA DE OBSERVER 

  constructor(
    private dataService: DataService,
    // private tokenService: TokenService,
    private authService: AuthService,


  ) { }

  ngOnInit(): void {
    // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
    this.color$ = this.dataService.getColor$();
    this.color$.subscribe(color => this.color = color);
    // FIN A LA PRACTICA DE OBSERVER 

    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(flagUserAdmin => this.flagUserAdmin = flagUserAdmin)

  }

  // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
  ngOnDestroy() {
    this.colorSubscription.unsubscribe();
  }
  // FIN A LA PRACTICA DE OBSERVER 


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
