import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Degree } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { AdminService, DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-degree-item',
  templateUrl: './degree-item.component.html',
  styleUrls: ['./degree-item.component.css']
})
export class DegreeItemComponent implements OnInit, OnDestroy {

  @Input() item: Degree;

  @Input() showBtnAction!: boolean;
  @Input() formData: Degree;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<Degree> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Degree> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Degree> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  // formData: Degree; // Viene por un input
  oldData: Degree;

   // Validacion Admin STATUS
   esAdmin: boolean;
   private AdminServiceSubscription: Subscription | undefined;
  
  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    ) { }

  ngOnInit(): void {
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

  toggleForm(degree: Degree) {
    this.showForm = !this.showForm;
    this.formData = degree;
    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(degree: Degree) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(degree);
    }

  }
  
  update(degree: Degree) {
    this.dataService.updateDegree(degree).subscribe( {
      next: (v) => console.log("Guardado correctamente: ", v),
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        this.formData.name = this.oldData.name;
      },
      complete: () => console.log("Completada la actualizacion del Nivel de Formacion")
    } );
    
    this.toggleForm(degree);  // cierro el formulario
    
  }
  
  cancelation(degree: Degree) {
    this.toggleForm(degree);  // cierro el formulario
  }

}
