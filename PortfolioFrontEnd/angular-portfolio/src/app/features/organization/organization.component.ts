import { Component, EventEmitter, Input, OnInit, Output, Inject, OnDestroy, } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Organization, FullPersonDTO } from '../../models'

import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy {
  showForm: boolean = false;  // flag para mostrar o no el formulario

  // myData: Organization[] = [];
  // formData: Organization;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  // @Input() showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario
  // @Output() showBtnActionChange = new EventEmitter<boolean>();

  // @Input() myOrganizations: Organization[];
  // @Output() myOrganizationsChange = new EventEmitter<Organization[]>();
  // @Output() mySelectChange = new EventEmitter<Organization[]>();

  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  private itemParaBorrar: any;


  message: string;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


  constructor(
    private dataService: DataService,
    public matDialog: MatDialog,

    private adminService: AdminService,
    private baseDataService: BaseDataService,

    @Inject(MAT_DIALOG_DATA) public data: { message: string, },
    public dialogRef: MatDialogRef<OrganizationComponent>, //OrganizationModal

  ) {  }

  ngOnInit(): void {

    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
        // this.myData = currentData.organization;
      }
    );
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
    // this.resetForm();
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  // resetForm() {
  //   this.formData = new Organization();
  // }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;

  }

  cancelation(organization: Organization) {
    this.toggleForm();

  }

  openModalDelete(organization: Organization) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = organization;
    this.openDeleteModal(organization)
  }


  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/organization").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.baseData.organization = this.baseData.organization.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          // this.baseData.organization = this.myData;
          this.itemParaBorrar = null;
          this.baseDataService.setCurrentBaseData(this.baseData);
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
        },
        complete: () => { console.log("Completada la eliminacion de la Organization"); }

      });
    }
  }



  addItem(organization: Organization) {
    this.dataService.addEntity(organization, "/organization").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        organization.id = v.id;
        organization.person = this.baseData.id;
        this.baseData.organization.push(organization);
        this.baseDataService.setCurrentBaseData(this.baseData);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + organization.name);
      },
      complete: () => console.log("Completado el alta de la Organizacion")
    }
    );
    this.toggleForm();
    // this.resetForm();

  }

  openDeleteModal(data: any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-delete";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "eliminar",
      title: `Hola, está por eliminar una de las organizaciones`,
      description: `¿Estás seguro de eliminar a "${data.name}" ?`,
      // por defecto mostrararía Aceptar
      actionButtonText: "Eliminar",
      // por defecto mostraría Cancelar
      cancelActionText: "Conservar",
      // por defecto utilizará el definido en style.css "mat-dialog-container#modal-component"
      backColor: "",

      // atributos exclusivos para este message-box
      data: data,
    }

    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(MessageBoxComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(
      data => {
        console.log("Dialogo output: ", data);
        if (data) { this.delItem() }
      }

    )
  }

}
