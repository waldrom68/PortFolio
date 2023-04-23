import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FullPersonDTO, Interest, Mensaje } from '../../../models'

import { faTrash, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService, UiService } from 'src/app/service/ui.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';

@Component({
  selector: 'app-interests-item',
  templateUrl: './interests-item.component.html',
  styleUrls: ['./interests-item.component.css']
})
export class InterestsItemComponent implements OnInit, OnDestroy {

  @Input() item: Interest;

  // @Input() formData: Interest;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<Interest> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Interest> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Interest> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  oldData: Interest;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  // element: object;
  // fragment: string = 'Init';

  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private formService: FormService,
    private uiService: UiService, 

    // private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 

    
  ) { }

  ngOnInit(): void {
    // this.oldData = this.item;
    // this.oldData = this.item;
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
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();
  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(interest: Interest) {
    this.showForm = !this.showForm;
    // this.formData = interest;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }

    this.baseDataService.setCurrentBaseData(this.baseData)
  }

  delete(interest: Interest) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(interest);
    }

  }

  update(interest: Interest) {
    // Actualizacion de Interest
    this.dataService.upDateEntity(interest, "/interest").subscribe({
      next: (v) => {
        console.log("Guardado correctamente", interest)
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + this.oldData.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr( msg,); 
        // alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.error.mensaje ? e.error.mensaje : e.message);
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        // this.formData = this.oldData;
        interest.name = this.oldData.name;

      },
      complete: () => console.log("Completada la actualizacion del interes")
    });

    this.toggleForm(interest);  // cierro el formulario
    // this.baseDataService.setCurrentBaseData(this.baseData);

  }

  cancelation(interest: Interest) {
    this.toggleForm(interest);  // cierro el formulario
  }


  // ngAfterViewInit(): void {
  //   let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
  //   element.scrollIntoView({ behavior: 'smooth' });
  // }
  


}
