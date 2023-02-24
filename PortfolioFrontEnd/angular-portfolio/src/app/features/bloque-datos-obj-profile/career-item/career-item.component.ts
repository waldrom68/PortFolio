import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullPersonDTO, LaboralCareer, Organization, RolePosition } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-career-item',
  templateUrl: './career-item.component.html',
  styleUrls: ['./career-item.component.css']
})
export class CareerItemComponent implements OnInit {
  // SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;


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

  DATAPORTFOLIO: FullPersonDTO;

  constructor( private dataService: DataService, ) { }

  ngOnInit() {
    this.DATAPORTFOLIO = this.dataService.getData();

    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()

  }
  
  color:string = 'red';

  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(laboralCareer: LaboralCareer) {
    this.showForm = !this.showForm;
    this.formData = laboralCareer;

    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(laboralCareer: LaboralCareer) {
    // llamo al metodo del padre via emit()
    if (this.flagUserAdmin) {
      this.onDelete.emit(laboralCareer);
    }

  }
  cancelation(laboralCareer: LaboralCareer) {
    this.toggleForm(laboralCareer);  // cierro el formulario
  }

  update(laboralCareer: LaboralCareer) {

    this.dataService.updateLaboralCareer(laboralCareer).subscribe( {
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        console.log("Creo que aqui está el error", laboralCareer)
        // v.person = this.DATAPORTFOLIO.id;
        // this.myData.push(v);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + laboralCareer.resume);
      },
      complete: () => console.log("Completado el alta en Trayectoria Laboral")
    });



    this.toggleForm(laboralCareer);  // cierro el formulario

  }
}
