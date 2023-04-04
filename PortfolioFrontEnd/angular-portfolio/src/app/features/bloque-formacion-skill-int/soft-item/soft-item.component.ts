import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FullPersonDTO, SoftSkill } from '../../../models'

import { faPen, faTimes, faTrash, faHand } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService, UiService } from 'src/app/service/ui.service';


@Component({
  selector: 'app-soft-item',
  templateUrl: './soft-item.component.html',
  styleUrls: ['./soft-item.component.css']
})
export class SoftItemComponent implements OnInit, OnDestroy {
  @Input() item: SoftSkill;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Output() onDelete: EventEmitter<SoftSkill> = new EventEmitter()
  @Output() onUpdate: EventEmitter<SoftSkill> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<SoftSkill> = new EventEmitter()
  
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;
  faHand = faHand;

  showForm: boolean = false;
  formData: SoftSkill;
  oldData: SoftSkill;
  
  // Se utiliza para la generacion de los Id en el html, evita conflictos en la ejecucion 
  // del widgets.js
  regex= /[^a-zA-Z]+/g;
  // item.name.replace("/[a-zA-Z]+/g","")
  
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;
  element: object;
  fragment: string = 'Init';

  constructor(  
    private dataService: DataService, 
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private formService: FormService,
    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 
    
    private uiService: UiService,
    ) { }

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
    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm : 0;
      }
    );
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();
  }

  color:string = 'red';
  
  changeStyle($event: Event){
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(softskill: SoftSkill) {
    this.showForm = !this.showForm;
    this.formData = softskill;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }
  }

  delete(softskill: SoftSkill) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(softskill);
    }

  }

  update(softskill: SoftSkill) {
    this.dataService.upDateEntity(softskill, "/softskill").subscribe({
      next: (v) =>  {
        console.log("Guardado correctamente")
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + this.oldData.name);
        msg.push(e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        this.uiService.msgboxErr( msg,); 

        // Restauro valor original
        this.formData.name = this.oldData.name;
        this.formData.assessment = this.oldData.assessment;
      },
      complete: () => console.log("Completada la actualizacion del softskill")
    } );

    this.toggleForm(softskill);  // cierro el formulario

  }

  cancelation(softskill: SoftSkill) {
    this.toggleForm(softskill);  // cierro el formulario
  }
  
  ngAfterViewInit(): void {
    let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }
  

}
