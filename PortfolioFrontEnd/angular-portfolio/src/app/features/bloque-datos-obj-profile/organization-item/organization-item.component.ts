import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Organization } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-organization-item',
  templateUrl: './organization-item.component.html',
  styleUrls: ['./organization-item.component.css']
})
export class OrganizationItemComponent implements OnInit, OnDestroy {


  @Input() item: Organization;
  @Input() formData: Organization;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<Organization> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Organization> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Organization> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  // formData: Organization;
  oldData: Organization;


  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;


  constructor(
    private dataService: DataService,
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
  }

  ngOnDestroy() {

    this.AdminServiceSubscription?.unsubscribe();
  }
  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(organization: Organization) {
    this.showForm = !this.showForm;
    this.formData = organization;

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
    this.dataService.updateOrganization(organization).subscribe(
      {
        next: (v) => console.log("Organization guardada correctamente: ", v),
        error: (e) => {
          alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
          console.log("Se quizo modificar sin exito a: " + this.oldData.name);
          // Restauro valor original
          this.formData.name = this.oldData.name;
        },
        complete: () => console.log("Completada la actualizacion de la Organization")
      });
    this.toggleForm(organization);  // cierro el formulario

  }

  cancelation(organization: Organization) {
    this.toggleForm(organization);  // cierro el formulario
  }

}
