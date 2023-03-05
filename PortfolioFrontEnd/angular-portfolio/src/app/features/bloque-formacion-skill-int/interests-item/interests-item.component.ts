import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { faTrash, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { Interest } from '../../../models'


@Component({
  selector: 'app-interests-item',
  templateUrl: './interests-item.component.html',
  styleUrls: ['./interests-item.component.css']
})
export class InterestsItemComponent implements OnInit, OnDestroy {
  @Input() item: Interest;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<Interest> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Interest> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Interest> = new EventEmitter()
 
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  formData: Interest;
  oldData: Interest;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
 


  constructor( 
    private dataService: DataService,
    private adminService: AdminService,
    ) { }

  ngOnInit(): void {
    // this.oldData = this.item;
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({} , this.item)
    
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
  }

  color:string = 'red';
  
  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(interest: Interest) {
    this.showForm = !this.showForm;
     this.formData = interest;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(interest: Interest) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      // console.log("paso por delete() de interest-item")
      this.onDelete.emit(interest);
    }

  }

  update(interest: Interest) {
    // Actualizacion de Interest
    console.log("Ejecuto this.upDateItem()");
    // upDateEntity(entidad: any): Observable<any>
    // this.dataService.updateInterest(interest).subscribe( {
    this.dataService.upDateEntity(interest, "/interest").subscribe( {
      next: (v) => console.log("Guardado correctamente: ", v),
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        this.formData.name = this.oldData.name;
      },
      complete: () => console.log("Completada la actualizacion del interes")
    } );

    this.toggleForm(interest);  // cierro el formulario

  }

  cancelation(interest: Interest) {
    this.toggleForm(interest);  // cierro el formulario
  }
  
}
