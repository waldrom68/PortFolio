import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {Person} from '../../../models'

import { faPen, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { AdminService, DataService } from 'src/app/service/data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.css']
})
export class ProfileItemComponent implements OnInit, OnDestroy {
  @Input() myData: Person;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();


  @Output() delete: EventEmitter<Person> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faPlusCircle = faPlusCircle;

  showForm: boolean = false;

    // Validacion Admin STATUS
    esAdmin: boolean;
    private AdminServiceSubscription: Subscription | undefined;
   

    
  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    ) { }

  ngOnInit() {

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
  }
  
  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
  }

  onDelete(user: Person) {
    // llamo al metodo del padre via emit()
    if (this.esAdmin) {
        this.delete.emit(user);
    }

  }

  
  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction
  }

}
