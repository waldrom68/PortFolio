import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { BaseDataService, DataService, ToPerson } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { faTrash, faPen, faTimes, faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { FullPersonDTO, Person } from '../../models'
import { MessageBoxComponent } from 'src/app/shared/message-box/message-box.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-objetive',
  templateUrl: './objetive.component.html',
  styleUrls: ['./objetive.component.css']
})


export class ObjetiveComponent implements OnInit, OnDestroy {

  form: FormGroup;
  formData: Person;
  tempValue: string = "";
  showForm: boolean = false;  // flag para mostrar o no el formulario

  // flag para mostrar o no los btn's de acciones del usuario
  showBtnAction: boolean = true;

  itemParaBorrar: FullPersonDTO;
  flagBorrado: boolean = false;
  flagBorrado$: Observable<boolean>;

  converPerson: Person;

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;
  faCheck = faCheck;
  faPlusCircle = faPlusCircle;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public matDialog: MatDialog,
    private modalService: ModalActionsService,
    private adminService: AdminService,

    private baseDataService: BaseDataService,
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

    // subscribo y me entero si se cambia el estatus del flag  
    this.flagBorrado$ = this.modalService.getFlagBorrado$();
    this.flagBorrado$.subscribe((tt) => {
      console.log(`Se acepto el borrado del item "${this.itemParaBorrar}"`);
      this.baseData.objetive = ""
    })

    this.form = this.formBuilder.group({
      objetive: ["Es importante ingresar un objetivo", [Validators.required, Validators.minLength(35)]],
    });


  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }

  get Objetive(): any {
    return this.form.get("objetive")
  }


  onEnviar(event: Event) {
    event.preventDefault;

    if (!this.esAdmin) {

      this.onCancel()

    } else {

      if (this.form.valid) {

        this.baseData.objetive = this.form.get("objetive")?.value.trim();
        this.converPerson = ToPerson(this.baseData);
        console.log(this.converPerson);

        this.dataService.upDateEntity(this.converPerson, "/person").subscribe({
          next: (v) => console.log("Guardado correctamente: ", v),
          error: (e) => {
            alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
            console.log("Se quizo modificar sin exito a: " + this.baseData.name);
            // Restauro valor original
            this.formData.objetive = this.tempValue;
          },
          complete: () => console.log("Completada la actualizacion del Objetivo")
        });
        this.toggleForm();  // cierro el formulario

      } else {

        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();
      }
    }
  }

  onCancel() {

    console.log("Cancele la operacion")
    this.baseData.objetive = this.tempValue;

    this.toggleForm();  // cierro el formulario

  }

  onDelete(user: FullPersonDTO) {
    // Este codigo acualiza el array Person para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
    this.itemParaBorrar = user;
    this.openDeleteModal(user)
    this.converPerson = ToPerson(this.baseData);
    console.log(this.converPerson);

    this.dataService.upDateEntity(this.converPerson, "/person").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        this.baseData.objetive = "";
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo upDateItem()" + "\n" + e.message);
        console.log("Se quizo modificar sin exito a: " + this.baseData.name);
        // Restauro valor original
        this.formData.objetive = this.tempValue;
      },
      complete: () => console.log("Completada la actualizacion del Objetivo")
    });

  }

  onAgregarObjetive() {
    this.baseData.objetive = "Sea claro con el objetivo...";
    this.toggleForm();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
    // PENDIENTE, es medio rebuscado como manejo el tema de mostrar el objetive o restablecer su valor 
    if (this.showForm) {
      this.tempValue = this.baseData.objetive
    }
  }

  openDeleteModal(data: any) {
    // Acciones definidas en el modal-action.service.ts
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-delete";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "delObjetive",
      title: `Hola, está por eliminar el objetivo`,
      description: `¿ es correcto ?`,
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

  }

}
