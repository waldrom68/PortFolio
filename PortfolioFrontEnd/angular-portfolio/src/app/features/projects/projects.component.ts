import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { faPlusCircle, faUpDown } from '@fortawesome/free-solid-svg-icons';

import {Project, FullPersonDTO } from '../../models'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { Subscription } from 'rxjs';
import { FormService, UiService } from 'src/app/service/ui.service';
import { ContainerListComponent } from 'src/app/shared/container-list/container-list.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  showForm: boolean = false;  // flag para mostrar o no el formulario

  faPlusCircle = faPlusCircle;
  faUpDown = faUpDown;

  showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
 
  itemParaBorrar: any;

  formData: Project;  // instancia vacia, para cuando se solicite un alta

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
 
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;
  element: object;
  fragment: string = 'Init';

  // componente order
  listToOrdered: Project[];
  oldData: Project[];

  constructor( 
    private dataService: DataService,
    private baseDataService: BaseDataService,
    private uiService: UiService,
    
    public matDialog: MatDialog,
    public dialog: MatDialog,
    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 

    private adminService: AdminService,
    private formService: FormService,

    ) {
      this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
        currentData => {
          this.baseData = currentData;
          // this.myData = currentData.project;
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

  ngOnInit(): void {

    this.listToOrdered = this.baseData.project;
    this.oldData = Object.assign({}, this.baseData.project);

    this.resetForm()

  }

  
  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();
  }

  resetForm() {
    this.formData = new Project();
  }

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
  
  cancelation() {
    this.toggleForm();
  }

  openModalDelete(project: Project){
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = project;
    this.openDeleteModal(project)
  }

  delItem(){
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/project").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.uiService.msgboxOk(['Se ha eliminado exitosamentee'] ,);

          this.baseData.project = this.baseData.project.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          // this.baseData.project = this.baseData.project;
          this.itemParaBorrar = null;
          this.baseDataService.setCurrentBaseData(this.baseData);
        },
        error: (e) => {
          let msg = new Array()
          msg.push("Se quizo eliminar sin exito a: " + this.itemParaBorrar.name);
          msg.push(e.error.mensaje ? e.error.mensaje : e.message);
          this.uiService.msgboxErr( msg,); 

          console.log("Se quizo eliminar sin exito a: " , this.itemParaBorrar);
        },
        complete: () => console.log("Completada la actualizacion del proyecto")

      });
    }
  }
  
  addItem(project: Project) {
    this.dataService.addEntity(project, "/project").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ");
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);

        project.id = v.id;
        project.person = this.baseData.id;
        this.baseData.project.push(v);
        this.baseDataService.setCurrentBaseData(this.baseData);
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo agregar sin exito a: " +  project.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        console.log("Se quizo agregar sin exito a: " + project.name);
        this.uiService.msgboxErr( msg,); 
        
      },
      complete: () => console.log("Completado el alta del Proyecto")
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
    dialogConfig.maxHeight = "90%";
    dialogConfig.width = "600px";
    dialogConfig.maxWidth = "95%";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "eliminar",
      title: `Hola, está por eliminar uno de los proyectos`,
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

  // BLOQUE CODIGO DE ORDER COMPONENT
  openOrdered() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-reorder";
    // dialogConfig.panelClass = "modal-component";
    // dialogConfig.backdropClass = "modal-component"

    dialogConfig.height = "100%";
    dialogConfig.width = "auto";
    dialogConfig.data = {
      listToOrdered: this.listToOrdered,
      fields: ["since","name"],
    }

    const modalDialog = this.dialog.open(ContainerListComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(
      data => {
        // console.log("Dialogo output: ", data);
        if (data) {
          this.orderedUpdate()
        }
        else {
          this.orderedCancel();
        }
      }

    )

  }

  orderedCancel() {
    console.log("Cancelada operacion de reorden");

  }

  orderedUpdate() {
    this.listToOrdered.forEach((elemento: Project) => {
      elemento.person = this.baseData.id
    })

    this.saveReOrder();

  }

  saveReOrder() {
    this.dataService.upDateOrderEntity(this.listToOrdered, "/project").subscribe({
      next: (v) => {
        console.log("Nuevo orden guardado exitosamente");
        this.uiService.msgboxOk(['Nuevo orden guardado exitosamente'],);
        this.baseDataService.setCurrentBaseData(this.baseData);

      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo guardar un reordenamiento sin exito");
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr(msg,);

        this.orderedCancel();
        // this.baseData.project = this.oldData;
        
        // PENDIENTE, solucion de compromiso para revertir cambios
        for (let index = 0; index < this.baseData.project.length; index++) {
          const element = this.oldData[index];
          this.baseData.project[index] = element;
        }
        console.log("Se quizo guardar un reordenamiento sin exito", e.error.mensaje);
      },
      complete: () => console.log("Completado el reordenamiento del project")
    }
    );
  }
  // FIN BLOQUE DE ORDER COMPONENT

  ngAfterViewInit(): void {
  let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
  element.scrollIntoView({ behavior: 'smooth' });
}

}
