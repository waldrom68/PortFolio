import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Person} from '../../../data'

import { faPen, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/service/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.css']
})
export class ProfileItemComponent implements OnInit {
  @Input() myData: Person;

  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();


  @Output() delete: EventEmitter<Person> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faPlusCircle = faPlusCircle;

  showForm: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit() {
     
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()

  }
  
  onDelete(user: Person) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
        this.delete.emit(user);
    }

  }

  
  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction
  }

}
