import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { HardSkill, FullPersonDTO} from '../../models'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';

import { Observable } from 'rxjs';

// Declaro la funcion que debe levantarse de \src\assets\widget.js
declare function initAndSetupTheSliders(): void;

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css']
})
export class HardSkillsComponent implements OnInit {

  // SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario
 
  myData: HardSkill[] = [];
  formData: HardSkill;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: any;  // objeto que se está por borrar, sirve para reestablecer si cancela borrado


  // user: Person;

  DATAPORTFOLIO: FullPersonDTO;
  
  constructor(
    private dataService: DataService,
 
    public matDialog: MatDialog,
  ) { 
    
  }

  ngOnInit(): void {
    this.DATAPORTFOLIO = this.dataService.getData();
    this.myData = this.DATAPORTFOLIO.hardskill;

    // Verifica si está logueado como ADMIN
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin)
    this.flagUserAdmin = this.dataService.getFlagUserAdmin()
    
    this.resetForm();
  }

  resetForm() {
    this.formData = { id:0, name:"", assessment:0, orderdeploy:0, person:0 }
  }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
  }  
  
  cancelation() {
    this.toggleForm();
  }

  openModalDelete(hardSkill: HardSkill) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = hardSkill;
    this.openDeleteModal(hardSkill);
  }

  delItem(){
    if (this.itemParaBorrar) {
      this.dataService.delHardSkill(this.itemParaBorrar).subscribe( {
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.DATAPORTFOLIO.hardskill = this.myData;
          this.itemParaBorrar = null;
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: " , this.itemParaBorrar);
        },
        complete: () => {console.log("Completada la actualizacion del hardSkill");}

      });
    }
  }

  // upDateItem(hardSkill: HardSkill) {
  //   this.dataService.updateHardSkill(hardSkill).subscribe();
  // }
  
  addItem(hardSkill: HardSkill) {
    this.dataService.addHardskill(hardSkill).subscribe( {
      next: (v) => {
        console.log("Interes guardado correctamente: ", v);
        v.person = this.DATAPORTFOLIO.id;
        this.myData.push(v);
      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + hardSkill.name);
      },
      complete: () => console.log("Completado el alta del hardSkill")
    });
    this.resetForm();
    this.toggleForm();
  }

  openDeleteModal(data:any) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "eliminar",
      title: `Hola, está por eliminar una de las habilidades técnicas`,
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

  // ngAfterViewInit(){
  //   initAndSetupTheSliders();
  // }

  ngAfterViewChecked() {
    initAndSetupTheSliders();
  }

  // creo que esta misma funcion de JS debiera ir en item-component
  ngAfterContentChecked() {
    // console.log("se termino ngAfterContentChecked")
    initAndSetupTheSliders();
  }
}
