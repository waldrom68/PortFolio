import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FullPersonDTO, Person } from '../../models'

import { faPen, faTimes, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { DataService, AdminService } from 'src/app/service/data.service';
import { Observable, Subscription } from 'rxjs';
import { PersonalFormComponent } from '../personal-form/personal-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadMediaService } from 'src/app/service/upload-media.service';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit, OnDestroy {

  showForm: boolean = false;  // flag para mostrar o no el formulario
  showBtnAction: boolean = true;  // flag para mostrar o no los btn's de acciones del usuario


  // myData: FullPersonDTO;
  DATAPORTFOLIO: FullPersonDTO;

  faPen = faPen;
  faTimes = faTimes;
  faLocationDot = faLocationDot;

  // codigo probando el modal
  dataFromDialog: any;
  form: FormGroup;

  formImg: FormGroup;
  changeImg: boolean;


  // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
  colorSubscription: Subscription;
  color: string;
  color$: Observable<string>;
  // FIN A LA PRACTICA DE OBSERVER 

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;


  constructor(
    private dataService: DataService,

    private adminService: AdminService,

    private matDialog: MatDialog,

    private uploadMediaService: UploadMediaService,

    private fb: FormBuilder,
    // private fb: FormBuilder,

    private renderer: Renderer2,  // Se usa para renderizar tras la carga de todos los componentes iniciales, ngAfterViewInit 


  ) {  }


  ngOnInit(): void {
    console.log("PASA POR PERSONAL-CARD.COMPONENT");

    this.DATAPORTFOLIO = this.dataService.getData();

    // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
    this.color$ = this.dataService.getColor$();
    this.color$.subscribe(color => this.color = color);
    // FIN A LA PRACTICA DE OBSERVER 

    this.formImg = this.fb.group({ pathFoto: [this.DATAPORTFOLIO.pathFoto, [Validators.required]], });

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {
    // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
    this.colorSubscription.unsubscribe();
    // FIN A LA PRACTICA DE OBSERVER 
    this.AdminServiceSubscription?.unsubscribe();

  }

  // PENDIENTE, ESTÁ VINCULADO A LA PRACTICA DE OBSERVER
  setcolor() {
    this.dataService.setColor("burlywood");
    // FIN A LA PRACTICA DE OBSERVER 
  }


  get PathFoto(): any {
    return this.formImg.get("pathFoto")
  }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction
  }

  toggleFlagChangeImg() {
    console.log("Teoricamente debo abrir el form");

    this.changeImg = !this.changeImg;
    this.refreshImg();
  }

  async upLoadFile(evento: Event) {
    evento.preventDefault;
    // PENDIENTE
    // actualizar la imagen al cerrar el form.
    // no mostrar el input, mostrar un boton, actualizar el input al obtener la URL

    // Solo se puede tener una foto de perfil.
    const path = "image/" + this.DATAPORTFOLIO.id;
    const name = "/fotoPerfil"
    // this.uploadMediaService.upLoadFile(evento, path, name);
    console.log("pasando por personalcard modificacion de imagen");

    this.uploadMediaService.upLoadFile(evento, path, name);

    // NO CREO QUE SEA UNA BUENA PRACTICA, PERO LA ACTUALIZACION AL OBJETO DATAPORTFOLIO 
    // LO REALIZO EN EL SERVICIO
    const url: string = this.uploadMediaService.url;
    console.log("Archivo en la nube: ", url)


    this.dataService.changeGralData(this.DATAPORTFOLIO);
    this.changeImg = true;
    this.refreshImg()


  }


  refreshImg() {
    // SOLUCION DE COMPROMISO
    console.log("Solucion de compromiso para manejar informacion async");

    setTimeout(() => {

      let element = this.renderer.selectRootElement(`#${'mifoto'}`, true);
      element.scrollIntoView({ behavior: 'smooth' });

    }, 4000);

  }

  gralDataToPerson(data: FullPersonDTO): Person {
    return new Person(
      data.id,
      data.name,
      data.lastName,
      data.pathFoto,
      data.location,
      data.profession,
      data.profile,
      data.objetive,
      data.since,
      data.email,
      data.displaydata
    )
  }

  openPersonModal(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.restoreFocus = true;
    dialogConfig.id = "modal-component";

    dialogConfig.height = "80%";
    dialogConfig.width = "90%";

    dialogConfig.data = { message: "Datos generales", }

    const dialogRef = this.matDialog.open(PersonalFormComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data) => {

      if (data.clicked === 'update') {

        // Obtengo nuevo objeto para actualizar en la base de datos
        const person = this.gralDataToPerson(data.newData);

        // Actualizo los datos via dataService
        this.dataService.updateGralData(person).subscribe({
          next: (v) => {
            console.log("Guardado correctamente: ", v);
            // Actualizo la variable observada por el resto de los componentes
            this.dataService.changeGralData(data.newData);
          },
          error: (e) => {
            alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
            console.log("Se quizo modificar sin exito a: " + person.lastName);
          },
          complete: () => console.log("Completado la actualizacion de datos")
        });

      }  // cierro la condicion si action es update
    });  // cierro el afterclosed()
  }  // fin openPersonModal()


}
