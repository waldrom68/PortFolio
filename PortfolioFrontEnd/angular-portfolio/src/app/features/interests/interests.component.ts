import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { FullPersonDTO, Interest } from '../../models'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})


export class InterestsComponent implements OnInit {

  // SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario

  myData: Interest[] = [];
  formData: Interest;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  itemParaBorrar: any;  // objeto que se está por borrar, sirve para reestablecer si cancela borrado

  // user: Person;

  DATAPORTFOLIO: FullPersonDTO;

  constructor(
    private dataService: DataService,

    public matDialog: MatDialog,

  ) {
    this.resetForm();
  }

  ngOnInit(): void {

    this.DATAPORTFOLIO = this.dataService.getData();
    this.myData = this.DATAPORTFOLIO.interest;

    // Verifica si está logueado como ADMIN
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()

  }

  resetForm() {
    this.formData = { id: 0, name: "", orderdeploy: 0, person: 0 }
  }
  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction
  }

  cancelation() {
    this.toggleForm();
  }

  openModalDelete(interest: Interest) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = interest;
    this.openDeleteModal(interest);
  }

  delItem() {
    if (this.itemParaBorrar) {
      // console.log(`Se acepto el borrado del item "${this.itemParaBorrar.name}"`);
      this.dataService.delInterest(this.itemParaBorrar).subscribe( {
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.DATAPORTFOLIO.interest = this.myData;
          this.itemParaBorrar = null;

        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: " , this.itemParaBorrar);
        },
        complete: () => console.log("Completada la actualizacion del interes")
      }
      );
   }

  }

  addItem(interest: Interest) {
    // console.log("Ejecuto this addItem()")
    this.dataService.addInterest(interest).subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);
        interest.id = v.id;
        v.person = this.DATAPORTFOLIO.id;
        this.myData.push(v);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + interest.name);
      },
      complete: () => console.log("Completado el alta del interes")
    }
    );
    this.resetForm();
    this.toggleForm();
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
      title: `Hola, está por eliminar uno de los intereses`,
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
        if (data) {this.delItem() }
      }

    )
  }

}
