import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Studie, Organization, Person, Degree, FullPersonDTO } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-studie-item',
  templateUrl: './studie-item.component.html',
  styleUrls: ['./studie-item.component.css']
})
export class StudieItemComponent implements OnInit, OnDestroy {

  @Input() item: Studie;

  @Input() formData: Studie;
  @Input() myOrganizations: Organization[];
  @Input() myDegrees: Degree[];

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<Studie> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Studie> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Studie> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


 // Validacion Admin STATUS
 esAdmin: boolean;
 private AdminServiceSubscription: Subscription | undefined;


  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService, 
    ) { }

  ngOnInit() {
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

  color:string = 'red';

  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(studie: Studie) {
    this.showForm = !this.showForm;
    this.formData = studie;
 
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(studie: Studie) {
    // llamo al metodo del padre via emit()
    if (this.esAdmin) {
      this.onDelete.emit(studie);
    }

  }
  cancelation(studie: Studie) {
    this.toggleForm(studie);  // cierro el formulario
  }

  update(studie: Studie) {
    console.log("Recibo esta modificacion", studie);
    
    this.dataService.updateStudie(studie).subscribe( {
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        // v.person = this.DATAPORTFOLIO.id;
        // this.myData.push(v);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + studie.name, "si realmente tiene el mismo nombre, procure hacer un pequeño cambio");
        // AQUI RESTAURO oldData
        studie = this.item;
      },
      complete: () => console.log("Completado el alta en Formación")
    });



    this.toggleForm(studie);  // cierro el formulario

  }
}
