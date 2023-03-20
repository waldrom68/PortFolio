import { Component, OnDestroy, OnInit } from '@angular/core';

import { faTimes, faUser, faAt, IconPrefix, IconName } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn, faGoogle, fab } from '@fortawesome/free-brands-svg-icons';

import { Observable, Subscription } from 'rxjs';
import { AuthService, AdminService  } from 'src/app/service/auth.service';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { FullPersonDTO } from 'src/app/models';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


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
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  // Prefix de los iconos de @fontawesome
  iconPrefix: IconPrefix = 'fab'

  constructor(
    private library: FaIconLibrary,
    private authService: AuthService,

    private adminService: AdminService,
    private baseDataService: BaseDataService,


  ) { 
    library.addIconPacks(fab);
  }

  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  iconExists(prefix: IconPrefix, name: IconName): boolean {
    return this.library.getIconDefinition(prefix, name) != null;
  }
  
  onLogOut() {

    this.authService.logout();

  }

}
