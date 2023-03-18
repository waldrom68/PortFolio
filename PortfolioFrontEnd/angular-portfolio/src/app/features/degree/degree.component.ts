import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Degree, FullPersonDTO } from '../../models'

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})

export class DegreeComponent implements OnInit, OnDestroy {
  showForm: boolean = false;  // flag para mostrar o no el formulario

  // myData: Degree[] = [];
  // formData: Degree;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  // @Input() showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario
  // @Output() showBtnActionChange = new EventEmitter<boolean>();

  // @Input() myDegrees: Degree[];
  // @Output() myDegreesChange = new EventEmitter<Degree[]>();

  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  itemParaBorrar: any;

  message: string;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;
  
  constructor(
    private dataService: DataService,
    public matDialog: MatDialog,

    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private formService: FormService,

    @Inject(MAT_DIALOG_DATA) public data: { message: string, },
    public dialogRef: MatDialogRef<DegreeComponent>, //DegreeModal

  ) { }

  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
        // this.myData = currentData.degree;
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

  // resetForm() {
  //   this.formData = new Degree();
  // }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }
        
  }

  cancelation(degree: Degree) {
    this.toggleForm();
  }

  openModalDelete(degree: Degree) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = degree;
    this.openDeleteModal(degree)
  }

  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/degree").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.baseData.degree = this.baseData.degree.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          // this.baseData.degree = this.myData;
          this.itemParaBorrar = null;
          this.baseDataService.setCurrentBaseData(this.baseData);
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
        },
        complete: () => { console.log("Completada la actualizacion del nivel de Formación"); }

      });
    }
  }


  addItem(degree: Degree) {
    this.dataService.addEntity(degree, "/degree").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        degree.id = v.id;
        degree.person = this.baseData.id;
        this.baseData.degree.push(degree);
        this.baseDataService.setCurrentBaseData(this.baseData);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + degree.name);
      },
      complete: () => console.log("Completado el alta de la Formación")
    });
    this.toggleForm();
    // this.resetForm();

  }

  openDeleteModal(data: any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-delete";
    dialogConfig.height = "350px";
    dialogConfig.maxHeight = "90%";
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "95%";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "eliminar",
      title: `Hola, está por eliminar una de las niveles de carreras`,
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
        // console.log("Dialogo output: ", data);
        if (data) { this.delItem() }
      }

    )
  }
}