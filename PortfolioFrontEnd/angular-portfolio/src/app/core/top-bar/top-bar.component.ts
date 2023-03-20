import { Component, OnDestroy, OnInit } from '@angular/core';

import { faTimes, faUser, faAt } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faGoogle } from '@fortawesome/free-brands-svg-icons';

import { Observable, Subscription } from 'rxjs';
import { AuthService, AdminService  } from 'src/app/service/auth.service';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit, OnDestroy {

  faTimes = faTimes;
  faUser = faUser;
  faAt = faAt;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;
  faGoogle = faGoogle;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
 

  constructor(
    // PENDIENTE MODO PRUEBA
    private dataService: DataService,
    // FIN MODO PRUEBA
    private authService: AuthService,

    private adminService: AdminService,


  ) { }

  ngOnInit(): void {
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
  }


  onLogOut() {

    this.authService.logout();

  }

}
