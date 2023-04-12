import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { HardSkill, FullPersonDTO } from '../../models'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';

import { Subscription } from 'rxjs';
import { FormService, UiService } from 'src/app/service/ui.service';


// Declaro la funcion que debe levantarse de \src\assets\widget.js
declare function initAndSetupTheSliders(): void;

@Component({
  selector: 'app-hard-skills',
  templateUrl: './hard-skills.component.html',
  styleUrls: ['./hard-skills.component.css']
})
export class HardSkillsComponent implements OnInit, OnDestroy {
  showForm: boolean = false;  // flag para mostrar o no el formulario

  // myData: HardSkill[] = [];
  // formData: HardSkill;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;

  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario

  itemParaBorrar: any;  // objeto que se está por borrar, sirve para reestablecer si cancela borrado

  formData: HardSkill;  // instancia vacia, para cuando se solicite un alta

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  element: object;
  fragment: string = 'Init';
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

  }

  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
        // this.myData = currentData.interest;
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

    this.resetForm();
  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();
  }

  resetForm() {
    this.formData = new HardSkill();
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

  openModalDelete(hardSkill: HardSkill) {
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = hardSkill;
    this.openDeleteModal(hardSkill);
  }

  delItem() {
    if (this.itemParaBorrar) {
      this.dataService.delEntity(this.itemParaBorrar, "/hardskill").subscribe({
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.uiService.msgboxOk(['Se ha eliminado exitosamentee'],);

          this.baseData.hardskill = this.baseData.hardskill.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.itemParaBorrar = null;
          this.baseDataService.setCurrentBaseData(this.baseData);
        },
        error: (e) => {
          let msg = new Array()
          msg.push("Se quizo eliminar sin exito a: " + this.itemParaBorrar.name);
          msg.push(e.error.mensaje ? e.error.mensaje : e.message);
          console.log("Se quizo eliminar sin exito a: ", this.itemParaBorrar);
          this.uiService.msgboxErr(msg,);

        },
        complete: () => { console.log("Completada la actualizacion del hardSkill"); }

      });
    }
  }


  addItem(hardSkill: HardSkill) {
    this.dataService.addEntity(hardSkill, "/hardskill").subscribe({
      next: (v) => {
        console.log("Guardado correctamente")
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);


        hardSkill.id = v.id;
        hardSkill.person = this.baseData.id;
        this.baseData.hardskill.push(hardSkill);
        this.baseDataService.setCurrentBaseData(this.baseData);
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo agregar sin exito a: " + hardSkill.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.error.mensaje ? e.error.mensaje : e.message);
        // console.log(e.error.mensaje ? e.error.mensaje : e.error.mensaje ? e.error.mensaje : e.message);

        this.uiService.msgboxErr(msg,);

        console.log("Se quizo agregar sin exito a: " + hardSkill.name);
      },
      complete: () => console.log("Completado el alta del hardSkill")
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
        if (data) { this.delItem() }
      }

    )
  }


  ngAfterViewInit(): void {
    let element = this.renderer.selectRootElement(`#${this.fragment}`, true);
    element.scrollIntoView({ behavior: 'smooth' });
  }

  ngAfterViewChecked() {
    initAndSetupTheSliders();
  }

  // creo que esta misma funcion de JS debiera ir en item-component
  ngAfterContentChecked() {
    // console.log("se termino ngAfterContentChecked")
    initAndSetupTheSliders();
  }
}
