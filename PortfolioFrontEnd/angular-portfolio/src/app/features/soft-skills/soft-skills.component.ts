import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { SoftSkill, FullPersonDTO } from '../../models'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';

import { Observable } from 'rxjs';


// Declaro la funcion que debe levantarse de \src\assets\widget.js
declare function updateProgress(): void;
@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {

  // SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario

  myData: SoftSkill[] = [];
  formData: SoftSkill;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  itemParaBorrar: any;

  // user: Person;

  DATAPORTFOLIO: FullPersonDTO;

  constructor(
    private dataService: DataService,

    public matDialog: MatDialog,

  ) {
    this.resetForm()
  }


  ngOnInit(): void {
    this.DATAPORTFOLIO = this.dataService.getData();
    this.myData = this.DATAPORTFOLIO.softskill;


    // Verifica si está logueado como ADMIN
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()

  }

  resetForm() {
    this.formData = { id: 0, name: "", assessment: 0, orderdeploy: 0, person: 0 }
  }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }

  cancelation() {
    this.toggleForm();
  }

  openModalDelete(softskill: SoftSkill) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = softskill;
    this.openDeleteModal(softskill);
  }

  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delSoftSkill(this.itemParaBorrar).subscribe({
        next: (v) => {
          console.log(v);
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.DATAPORTFOLIO.softskill = this.myData;
          this.itemParaBorrar = null;
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
        },
        complete: () => console.log("Completada la actualizacion del softskill")

      });
    }
  }


  // upDateItem(softskill: SoftSkill) {
  //   this.dataService.updateSoftSkill(softskill).subscribe();
  // }

  addItem(softskill: SoftSkill) {
    this.dataService.addSoftskill(softskill).subscribe({
      next: (v) => {
        console.log("Interes guardado correctamente: ", v);
        v.person = this.DATAPORTFOLIO.id;
        softskill.id = v.id;
        this.myData.push(v);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + softskill.name);
      },
      complete: () => console.log("Completado el alta del softskill")
    });
    this.resetForm();
    this.toggleForm();
  }

  openDeleteModal(data: any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "eliminar",
      title: `Hola, está por eliminar una de las habilidades personales`,
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

  // ngAfterViewInit(){
  //   console.log("se termino ngAfterViewInit")
  //   updateProgress();
  // }

  ngAfterViewChecked() {
    // console.log("se termino ngAfterViewChecked")
    updateProgress();
  }

  ngAfterContentChecked() {
    // console.log("se termino ngAfterContentChecked")
    updateProgress();
  }
}
