import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { LaboralCareer, FullPersonDTO } from '../../models'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';

import { Subscription } from 'rxjs';
import { FormService, UiService } from 'src/app/service/ui.service';


@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit, OnDestroy {

  showForm: boolean = false;  // flag para mostrar o no el formulario

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  itemParaBorrar: any;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  formData: LaboralCareer;  // instancia vacia, para cuando se solicite un alta

  recargarItem: number = 0;  // elemento para la directiva "RefreshDirective"

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  element: object;
  fragment: string = 'Init';

  constructor(
    private dataService: DataService,
    private baseDataService: BaseDataService,
    private uiService: UiService,

    public matDialog: MatDialog,

    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 

    private adminService: AdminService,
    private formService: FormService,
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
    this.formServiceSubscription = this.formService.currentOpenForm.subscribe(
      currentForm => {
        this.openForm = currentForm > 0 ? currentForm : 0;
      }
    );
    this.resetForm()

  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();
  }

  resetForm() {
    this.formData = new LaboralCareer();
  }


  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    }
  }

  cancelation(career: LaboralCareer) {
    this.toggleForm();
  }


  openModalDelete(laboralCareer: LaboralCareer) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = laboralCareer;
    this.openDeleteModal(laboralCareer)
  }

  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/laboralcareer").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.uiService.msgboxOk(['Se ha eliminado exitosamentee'] ,);


          this.baseData.laboralCareer = this.baseData.laboralCareer.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.baseDataService.setCurrentBaseData(this.baseData)
          this.itemParaBorrar = null;

        },
        error: (e) => {
          let msg = new Array()
          msg.push("Se quizo eliminar sin exito a: " + this.itemParaBorrar.name);
          msg.push(e.message);
          this.uiService.msgboxErr( msg,); 

          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
        },
        complete: () => { console.log("Completada la eliminacion en la Trayectoria Laboral"); }

      });
    }
  }


  addItem(laboralCareer: LaboralCareer) {
    this.dataService.addEntity(laboralCareer, "/laboralcareer").subscribe({
      next: (v) => {
        console.log("Guardado correctamente")
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);

        laboralCareer.id = v.id;
        laboralCareer.person = this.baseData.id;
        this.baseData.laboralCareer.push(v);
        this.baseDataService.setCurrentBaseData(this.baseData)
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo agregar sin exito un trabajo");
        msg.push(e.message);
        this.uiService.msgboxErr( msg,); 

        console.log("Se quizo agregar sin exito a: " + laboralCareer.resume, "si realmente tiene la misma descripcion, procure hacer un pequeño cambio");
      },
      complete: () => console.log("Completado el alta en Trayectoria Laboral")
    });
    this.resetForm();
    this.toggleForm();

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
      title: `Hola, está por eliminar uno de los trabajos`,
      description: `¿Estás seguro de eliminar "${data.organization.name} (${data.roleposition.name})" ?`,
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


  ngAfterViewInit(): void {
  let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
  element.scrollIntoView({ behavior: 'smooth' });
}
}
