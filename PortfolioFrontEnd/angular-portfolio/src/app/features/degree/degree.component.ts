import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Degree, FullPersonDTO } from '../../models'

import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';

import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.css']
})
export class DegreeComponent implements OnInit, OnDestroy {
  showForm: boolean = false;  // flag para mostrar o no el formulario

  myData: Degree[] = [];
  formData: Degree;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  @Input() showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
  @Output() showBtnActionChange = new EventEmitter<boolean>();
 
  @Input() myDegrees: Degree[];
  @Output() myDegreesChange = new EventEmitter<Degree[]>();
  
  itemParaBorrar: any;

  DATAPORTFOLIO: FullPersonDTO;
 
  message: string;

    // Validacion Admin STATUS
    esAdmin: boolean;
    private AdminServiceSubscription: Subscription | undefined;
   

  constructor(
    private dataService: DataService,
    public matDialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: { message: string,},
    public dialogRef: MatDialogRef<DegreeComponent>, //DegreeModal

    private adminService: AdminService,
    
  ) { }

  ngOnInit(): void {
    this.DATAPORTFOLIO = this.dataService.getData();
    this.myData = this.DATAPORTFOLIO.degree;
    
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

    this.resetForm();
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
  }

  resetForm() {
    this.formData = new Degree();
  }

  
  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }  

  cancelation(degree: Degree) {
    this.toggleForm();
  }

  openModalDelete(degree: Degree){
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = degree;
    this.openDeleteModal(degree)
  }

  delItem(){
    if (this.itemParaBorrar) {
      this.dataService.delDegree(this.itemParaBorrar).subscribe( {
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.itemParaBorrar = null;
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: " , this.itemParaBorrar);
        },
        complete: () => {console.log("Completada la actualizacion de la Formación");}

      });
    }
  }


  addItem(degree: Degree) {
    this.dataService.addDegree(degree).subscribe( {
      next: (v) => {this.myData.push( v )},
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + degree.name);
      },
      complete: () => console.log("Completado el alta de la Formación")
    });
    this.toggleForm();
    this.resetForm();
    
  }

  openDeleteModal(data:any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-delete";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
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
        console.log("Dialogo output: ", data);
        if (data) {this.delItem() }
      }

    )
  }
  
}