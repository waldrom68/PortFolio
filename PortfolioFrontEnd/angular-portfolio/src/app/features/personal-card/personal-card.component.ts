import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FullPersonDTO, Person } from '../../models'

import { faPen, faTimes, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { BaseDataService, DataService, ToPerson } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { Subscription } from 'rxjs';
import { PersonalFormComponent } from '../personal-form/personal-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadMediaService } from 'src/app/service/upload-media.service';
import { FormService, UiService } from 'src/app/service/ui.service';
import { SocialNetworkComponent } from '../social-network/social-network.component';


@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit, OnDestroy {

  showForm: boolean = false;  // flag para mostrar o no el formulario
  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario


  faPen = faPen;
  faTimes = faTimes;
  faLocationDot = faLocationDot;

  // codigo probando el modal
  // dataFromDialog: any;
  // form: FormGroup;

  formImg: FormGroup;
  // changeImg: boolean;


  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;
  openForm: number;
  private formServiceSubscription: Subscription | undefined;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;


  profession: string[];
  converPerson: Person;

  constructor(
    private dataService: DataService,
    private uiService: UiService,

    private adminService: AdminService,

    private baseDataService: BaseDataService,

    private matDialog: MatDialog,

    private uploadMediaService: UploadMediaService,

    private fb: FormBuilder,

    private formService: FormService,
    // private fb: FormBuilder,

  ) { }


  ngOnInit(): void {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
        if (this.baseData.profession) {
          this.profession = this.baseData.profession.split('\n')
        }
      }
    );

    this.formImg = this.fb.group({ pathFoto: [this.baseData.pathFoto, [Validators.required]], });

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
    // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
    // FIN A LA PRACTICA DE OBSERVER 
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
    this.formServiceSubscription?.unsubscribe();

  }

  get PathBgImage(): any {
    return this.formImg.get("pathBgImage")

  }

  get PathFoto(): any {
    return this.formImg.get("pathFoto")
  }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    };

  }

  toggleFlagChangeImg() {
    console.log("Teoricamente debo abrir el form");

    // this.changeImg = !this.changeImg;
    // this.refreshImg();

    if (this.showForm) {
      this.formService.setCurrentForm(this.openForm + 1)
    } else {
      this.formService.setCurrentForm(this.openForm - 1)
    };

  }

  async upLoadFile(evento: Event) {
    evento.preventDefault;
    // PENDIENTE
    // INVESTIGAR SI ES LA MEJOR PRACTICA PARA EL MANEJO DE ESTE PROCESO
    // ASINCRONICO. ESTOY MOVIENDO ESTE CODIGO QUE HACE EL HTTP REQUEST 
    // AL MISMO SERVICIO QUE SUBE LA IMAGEN.
    // 

    // Solo se puede tener una foto de perfil.
    const path = "image/" + this.baseData.id;
    const name = "/fotoPerfil"
    // Preparo una instancia de Person para actualizar la entidad en el backend
    this.converPerson = ToPerson(this.baseData);

    this.uploadMediaService.upLoadFile(evento, path, name, this.converPerson);

  }


  async upLoadFileBG(evento: Event) {
    evento.preventDefault;
    // PENDIENTE
    // INVESTIGAR SI ES LA MEJOR PRACTICA PARA EL MANEJO DE ESTE PROCESO
    // ASINCRONICO. ESTOY MOVIENDO ESTE CODIGO QUE HACE EL HTTP REQUEST 
    // AL MISMO SERVICIO QUE SUBE LA IMAGEN.
    // 

    // Solo se puede tener una foto de fondo.
    const path = "image/" + this.baseData.id;
    const name = "/fotoBG"
    // Preparo una instancia de Person para actualizar la entidad en el backend
    this.converPerson = ToPerson(this.baseData);

    this.uploadMediaService.upLoadFile(evento, path, name, this.converPerson);
  }


  openPersonModal(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.id = "modal-component";

    dialogConfig.height = "90%";
    dialogConfig.width = "95%";

    dialogConfig.data = { message: "Datos generales", }

    const dialogRef = this.matDialog.open(PersonalFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked === 'update') {

        // Obtengo nuevo objeto para actualizar en la base de datos
        // const person = this.gralDataToPerson(data.newData);
        this.converPerson = ToPerson(this.baseData);
        console.log("Esto devuelve la transformada", this.converPerson);
        // Actualizo los datos via dataService
        this.dataService.upDateEntity(data.newData, "/person").subscribe({
          next: (v) => {
            console.log("Guardado correctamente")
            this.uiService.msgboxOk(['Datos guardados exitosamente'],);


            // Actualizo la variable observada por el resto de los componentes
            // this.dataService.changeGralData(data.newData);
            this.baseDataService.setCurrentBaseData(data.newData);
          },
          error: (e) => {
            let msg = new Array()
            msg.push("Se quizo modificar sin exito a: " + this.converPerson.name);
            msg.push(e.error.mensaje ? e.error.mensaje : e.message);
            this.uiService.msgboxErr(msg,);

            console.log("Se quizo modificar sin exito a: " + this.converPerson.name);
          },
          complete: () => console.log("Completado la actualizacion de datos")
        });

      }  // cierro la condicion si action es update
    });  // cierro el afterclosed()
  }  // fin openPersonModal()




  openSocialModal(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.id = "modal-component";

    dialogConfig.height = "90%";
    dialogConfig.width = "95%";

    dialogConfig.data = { message: "Redes sociales", }

    const dialogRef = this.matDialog.open(SocialNetworkComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked === 'update') {

        // Obtengo nuevo objeto para actualizar en la base de datos
        // const person = this.gralDataToPerson(data.newData);

        console.log("Esto devuelve la transformada", this.baseData);
        // Actualizo los datos via dataService
        this.dataService.upDateEntity(data.newData, "/socialnetwork").subscribe({
          next: (v) => {
            console.log("Guardado correctamente")
            this.uiService.msgboxOk(['Datos guardados exitosamente'],);

            // Actualizo la variable observada por el resto de los componentes
            // this.dataService.changeGralData(data.newData);
            this.baseDataService.setCurrentBaseData(data.newData);
          },
          error: (e) => {
            let msg = new Array()
            msg.push("Se quizo modificar sin exito a: " + this.baseData.name);
            msg.push(e.error.mensaje ? e.error.mensaje : e.message);
            console.log("Se quizo modificar sin exito a: " + this.baseData.name);
            this.uiService.msgboxErr(msg,);
          },
          complete: () => console.log("Completado la actualizacion de Redes Sociales")
        });

      }  // cierro la condicion si action es update
    });  // cierro el afterclosed()
  }  // fin openPersonModal()


}
