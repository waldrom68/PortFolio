import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Person, DisplayData } from '../../../models'

import { faTimes, faTrash, faPencil, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-objetive-item',
  templateUrl: './objetive-item.component.html',
  styleUrls: ['./objetive-item.component.css']
})
export class ObjetiveItemComponent implements OnInit {
  @Input() item: Person;

  // PENDIENTE vincular con el logueo
  @Input() isAdmin : boolean;

  @Output() delete: EventEmitter<Person> = new EventEmitter()
  
  faTimes = faTimes;
  faTrash = faTrash;
  faPencil = faPencil;
  faPlusCircle = faPlusCircle;

  showAddForm:boolean = false;
  subscriptionAddForm?: Subscription;
  UserData: Person

  constructor( private dataservice: DataService, ) {
    this.UserData = this.item;
   }

  ngOnInit() {
  }
    // Metodos propios de la clase UserDataComponent
    // resetUser() {
    //   this.UserData = new Person()
    // }

    toggleForm() {
      // Alterna los estados de mostrar o no mostrar formulario
      this.showAddForm = !this.showAddForm;
    }

    onDelete(user: Person) {
      // llamo al metodo del padre via emit()
      if (this.isAdmin) {
          this.delete.emit(user);
      }

    }
}
