import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, resolveForwardRef } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { FullPersonDTO, Person, RolePosition } from '../../models'

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-role-position',
  templateUrl: './role-position.component.html',
  styleUrls: ['./role-position.component.css']
})

export class RolePositionComponent implements OnInit, OnDestroy {

  showForm: boolean = false;  // flag para mostrar o no el formulario

  myData: RolePosition[] = [];
  formData: RolePosition;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  @Input() showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Input() myRolePositions: RolePosition[];
  @Output() myRolePositionsChange = new EventEmitter<RolePosition[]>();

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  itemParaBorrar: any;

  message: string;
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;


  constructor(
    private dataService: DataService,
    private baseDataService: BaseDataService,
    public matDialog: MatDialog,

    private adminService: AdminService,

    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<RolePositionComponent>, //OrganizationModal

  ) { }

  ngOnInit(): void {
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
    this.resetForm();
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  resetForm() {
    this.formData = new RolePosition();
  }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;

  }


  cancelation(rolePosition: RolePosition) {
    this.toggleForm();
  }

  openModalDelete(rolePosition: RolePosition) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = rolePosition;
    this.openDeleteModal(rolePosition)
  }

  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delRolePosition(this.itemParaBorrar).subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.itemParaBorrar = null;
          this.baseData.roleposition = this.myData;
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
        },
        complete: () => { console.log("Completada la actualizacion de la Posicion o Rol"); }

      });
    }
  }


  addItem(rolePosition: RolePosition) {
    this.dataService.addRolePosition(rolePosition).subscribe({
      next: (v) => { 
        console.log("Guardado correctamente: ", v);
        rolePosition.id = v.id;
        v.person = this.baseData.id;
        this.myData.push(v);
        this.baseData.roleposition = this.myData;
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + rolePosition.name);
      },
      complete: () => console.log("Completado el alta de la Posicion o Rol")
    });
    this.toggleForm();
    this.resetForm();

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
      title: `Hola, está por eliminar una de las posiciones`,
      description: `¿Estás seguro de eliminar "${data.name}" ?`,
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
