import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FullPersonDTO, HardSkill } from '../../../models';

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-hard-item',
  templateUrl: './hard-item.component.html',
  styleUrls: ['./hard-item.component.css']
})
export class HardItemComponent implements OnInit, OnDestroy {
  @Input() item: HardSkill;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<HardSkill> = new EventEmitter()
  @Output() onUpdate: EventEmitter<HardSkill> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<HardSkill> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  formData: HardSkill;
  oldData: HardSkill;

  // Se utiliza para la generacion de los Id en el html, evita conflictos en la ejecucion 
  // del widgets.js
  regex= /[^a-zA-Z]+/g;  
  // item.name.replace("/[a-zA-Z]+/g","")
  
  
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  
  constructor( 
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    ) { 

  }

  ngOnInit(): void {
    // this.oldData = this.item;
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({} , this.item)
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

  toggleForm(hardskill: HardSkill) {
    this.showForm = !this.showForm;
    this.formData = hardskill;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(hardskill: HardSkill) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(hardskill);
    }

  }

  update(hardskill: HardSkill) {
    // Actualizacion de hardskill
    this.dataService.upDateEntity(hardskill, "/hardskill").subscribe( {
      next: (v) => console.log("Guardado correctamente: ", v),
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        this.formData.name = this.oldData.name;
        this.formData.assessment = this.oldData.assessment;
      },
      complete: () => console.log("Completada la actualizacion del hardskill")
    } );

    this.toggleForm(hardskill);  // cierro el formulario

  }
  
  cancelation(hardskill: HardSkill) {
    this.toggleForm(hardskill);  // cierro el formulario
  }

}
