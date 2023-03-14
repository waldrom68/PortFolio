import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FullPersonDTO, LaboralCareer, Organization, RolePosition } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-career-item',
  templateUrl: './career-item.component.html',
  styleUrls: ['./career-item.component.css']
})
export class CareerItemComponent implements OnInit, OnDestroy {

  @Input() item: LaboralCareer;

  @Input() formData: LaboralCareer;
  @Input() myOrganizations: Organization[];
  @Input() myRolePositions: RolePosition[];

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<LaboralCareer> = new EventEmitter()
  @Output() onUpdate: EventEmitter<LaboralCareer> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<LaboralCareer> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  oldData: LaboralCareer;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
 
  constructor( 
    private dataService: DataService, 
    private adminService: AdminService,
    private baseDataService: BaseDataService, ) 
    { }

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
      // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
      this.oldData = Object.assign({}, this.item)
  }
  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  color:string = 'red';

  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(laboralCareer: LaboralCareer) {
    console.log("Ingrese a toggleForm", laboralCareer);
    
    this.showForm = !this.showForm;
    this.formData = laboralCareer;

    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
    console.log("Ingrese a toggleForm y puse a showForm con el valor", this.showForm );
  }

  delete(laboralCareer: LaboralCareer) {
    // llamo al metodo del padre via emit()
    if (this.esAdmin) {
      this.onDelete.emit(laboralCareer);
    }

  }
  cancelation(laboralCareer: LaboralCareer) {
    this.toggleForm(laboralCareer);  // cierro el formulario
  }

  update(laboralCareer: LaboralCareer) {

    this.dataService.upDateEntity(laboralCareer, "/laboralcareer").subscribe( {
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        // v.person = this.baseData.id
        // this.baseData.laboralCareer = v;
        // this.item = laboralCareer;
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + laboralCareer.resume, "si realmente tiene la misma descripcion, procure hacer un pequeño cambio");
        // AQUI RESTAURO oldData
        laboralCareer = this.oldData;
      },
      complete: () => console.log("Completado el alta en Trayectoria Laboral")
    });



    this.toggleForm(laboralCareer);  // cierro el formulario

  }
}
