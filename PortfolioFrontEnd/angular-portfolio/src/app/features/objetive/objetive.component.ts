import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { faTrash, faPen, faTimes, faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import {Person} from '../../data'
import { MessageBoxComponent } from 'src/app/shared/message-box/message-box.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-objetive',
  templateUrl: './objetive.component.html',
  styleUrls: ['./objetive.component.css']
})
export class ObjetiveComponent implements OnInit {
  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = true;
  flagUserAdmin$: Observable<boolean>;

  myData: Person;

  form: FormGroup;
  formData: Person;
  tempValue:string = "";
  showForm: boolean = false;  // flag para mostrar o no el formulario
  
  // flag para mostrar o no los btn's de acciones del usuario
  showBtnAction: boolean = true;
 
  itemParaBorrar: Person;
  flagBorrado: boolean = false;
  flagBorrado$: Observable<boolean>;

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;
  faCheck = faCheck;
  faPlusCircle = faPlusCircle;


  constructor( 
    private formBuilder: FormBuilder,
    private dataService: DataService, 

    public matDialog: MatDialog,
    private modalService: ModalActionsService,
    ) {

    //   this.dataService.getGralData().subscribe(user =>
    //   this.myData = user
    // );
    // Este servicio debiera pasarse a un Observable
    this.myData = this.dataService.getUSER();

  }
  ngOnInit(): void {
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin);
    this.flagUserAdmin = this.dataService.getFlagUserAdmin();

    // subscribo y me entero si se cambia el estatus del flag  
    this.flagBorrado$ = this.modalService.getFlagBorrado$();
    this.flagBorrado$.subscribe( (tt)=> {
      console.log(`Se acepto el borrado del item "${this.itemParaBorrar}"`);
      this.myData.objetive = ""
    } )

    this.form = this.formBuilder.group({
      objetive:["", [Validators.required, Validators.minLength(35) ]],
      });

    
  }

  get Objetive(): any {
    return this.form.get("objetive")
  }

  onEnviar(event:Event) {
    event.preventDefault;

    if (!this.flagUserAdmin) {

      this.onCancel()

    } else {

      if (this.form.valid) {
    
        this.myData.objetive = this.form.get("objetive")?.value
        this.dataService.updateGralData(this.myData).subscribe()
        this.toggleForm();  // cierro el formulario

      } else {
        
        console.log("no es valido el valor ingresado")
        this.form.markAllAsTouched();

      }
    }
  }

  onCancel() {

    console.log("Cancele la operacion")
    this.myData.objetive = this.tempValue;

    this.toggleForm();  // cierro el formulario

  }

  onDelete(user: Person) {
    // Este codigo acualiza el array Person para que se actualice en 
    // el frontend, sin necesidad de recargar la pagina
    this.itemParaBorrar = user;
    this.openDeleteModal(user)

    this.dataService.updateGralData(user).subscribe()

    if (this.flagBorrado) {
      this.myData.objetive = "";
    }

  }

  onAgregarObjetive() {
    console.log("Quiero agregar")
    this.myData.objetive = "Sea claro con el objetivo...";
    this.toggleForm();
  }

  toggleForm() {
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;
    // PENDIENTE, es medio rebuscado como manejo el tema de mostrar el objetive o restablecer su valor 
    if (this.showForm) {
      this.tempValue = this.myData.objetive
    }
  }

  openDeleteModal(data:any) {
    // Acciones definidas en el modal-action.service.ts
    const userId = this.myData.name;
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "250px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "delObjetive",
      title: `Hi ${userId}, está por eliminar el objetivo`,
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

  }

}
