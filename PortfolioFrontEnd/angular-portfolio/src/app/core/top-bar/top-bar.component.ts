import { Component, OnDestroy, OnInit } from '@angular/core';

import { faTimes } from '@fortawesome/free-solid-svg-icons';
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

  // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
  colorSubscription: Subscription;
  color: string;
  color$: Observable<string>;
  // FIN A LA PRACTICA DE OBSERVER 

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
    // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
    this.color$ = this.dataService.getColor$();
    this.color$.subscribe(color => this.color = color);
    // FIN A LA PRACTICA DE OBSERVER 

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {
    // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
    this.colorSubscription.unsubscribe();
    // FIN A LA PRACTICA DE OBSERVER 
    this.AdminServiceSubscription?.unsubscribe();
  }


  onLogOut() {

    this.authService.logout();

  }







}
