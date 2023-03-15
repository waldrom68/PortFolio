import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FullPersonDTO, Organization } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { FormService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-organization-item',
  templateUrl: './organization-item.component.html',
  styleUrls: ['./organization-item.component.css']
})
export class OrganizationItemComponent implements OnInit, OnDestroy {

  @Input() item: Organization;
 
  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<Organization> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Organization> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Organization> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  oldData: Organization;


  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private formService: FormService,
  ) { }

  ngOnInit(): void {

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm  : 0;
      }
    );
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

  toggleForm(organization: Organization) {
    this.showForm = !this.showForm;

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }

    this.baseDataService.setCurrentBaseData(this.baseData)
    
     // habilito las acciones de cada item
    this.showBtnAction = true;
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(organization: Organization) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(organization);
    }
  }

  update(organization: Organization) {
    this.dataService.upDateEntity(organization, "/organization").subscribe( {
      
      next: (v) => {
        console.log("Guardado correctamente: ", v),

        // Debo actualizar dataBase, laboralcareer, la cual es copia del backend.
        // Como sólo se busca la info al iniciar el sistema, debo mantener una imagen
        // de lo que hago en la DB. 
        // Aquí lo hago para que se actualicen todas las relaciones laborales que 
        // contienen la Organization modificada caso contrario, no se actualizaran 
        // las mismas en el listado de otras trayectorias que contengan la misma 
        // organizacion.
        this.baseData.laboralCareer.forEach(element => {
          if (element.organization.id == organization.id)
            element.organization.name = organization.name;
        });
      },

        error: (e) => {
          alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
          console.log("Se quizo modificar sin exito a: " + this.oldData.name);
          // Restauro valor original
          organization = this.oldData;
        },

        complete: () => console.log("Completada la actualizacion de la Organization")
      });

    this.toggleForm(organization);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData);
  }

  cancelation(organization: Organization) {
    this.toggleForm(organization);  // cierro el formulario
  }

}
