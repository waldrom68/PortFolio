import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService, ToPerson } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';


import { faTrash, faPen, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { FullPersonDTO, Person } from '../../models'
import { MessageBoxComponent } from 'src/app/shared/message-box/message-box.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UiService } from 'src/app/service/ui.service';


@Component({
  selector: 'app-objetive',
  templateUrl: './objetive.component.html',
  styleUrls: ['./objetive.component.css']
})


export class ObjetiveComponent implements OnInit, OnDestroy {

  form: FormGroup;

  showForm: boolean = false;  // flag para mostrar o no el formulario

  // flag para mostrar o no los btn's de acciones del usuario
  showBtnAction: boolean = true;

  itemParaBorrar: string;

  converPerson: Person;

  faPen = faPen;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  element: object;
  fragment: string = 'Init';

  constructor(
    private uiService: UiService, 
    
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public matDialog: MatDialog,

    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 

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

    this.form = this.formBuilder.group({
      objetive: [this.baseData.objetive ? this.baseData.objetive : "", [Validators.required, Validators.minLength(35), Validators.maxLength(500)]],
    });

    this.itemParaBorrar = this.baseData.objetive;


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

        this.dataService.upDateEntity(this.converPerson, "/person").subscribe({
          next: (v) => {
            console.log("Guardado correctamente")
            this.uiService.msgboxOk(['Datos guardados exitosamente'],);

          },
          error: (e) => {
            let msg = new Array()
            msg.push("Se quizo modificar sin exito el objetivo");
            msg.push(e.error.mensaje ? e.error.mensaje : e.message);
            this.uiService.msgboxErr( msg,); 

            console.log("Se quizo modificar sin exito el objetivo");
            // Restauro valor original
            this.baseData.objetive = this.itemParaBorrar;
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
    this.toggleForm();  // cierro el formulario
  }



  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;

  }

  onDelete(user: FullPersonDTO) {
    // Llamo al modal
    this.openDeleteModal(user)

  }

  delItem() {

    this.baseData.objetive = "";
    this.converPerson = ToPerson(this.baseData);

    this.dataService.upDateEntity(this.converPerson, "/person").subscribe({
      next: (v) => {
        console.log("Guardado correctamente")
        this.uiService.msgboxOk(['Datos guardados exitosamente'],);

        this.baseDataService.setCurrentBaseData(this.baseData);
        this.form.reset();
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo eliminar sin exito al Objetivo");
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        console.log("Se quizo eliminar sin exito al objetivo");
        this.uiService.msgboxErr( msg,); 

        // Restauro valor original
        this.baseData.objetive = this.itemParaBorrar;
      },
      complete: () => console.log("Completada la actualizacion del Objetivo")
    });

    // this.toggleForm();
  }



  openDeleteModal(data: any) {
    // Acciones definidas en el modal-action.service.ts
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
  
}
