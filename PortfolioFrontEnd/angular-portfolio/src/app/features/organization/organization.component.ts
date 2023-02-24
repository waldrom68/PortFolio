import { Component, EventEmitter, Input, OnInit, Output, Inject, } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import { Organization, FullPersonDTO} from '../../models'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
 
  // SERVICIO QUE ESTÁ VINCULADO CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;

  showForm: boolean = false;  // flag para mostrar o no el formulario

  myData: Organization[] = [];
  formData: Organization;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  @Input() showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Input() myOrganizations: Organization[];
  @Output() myOrganizationsChange = new EventEmitter<Organization[]>();

  private itemParaBorrar: any;

  DATAPORTFOLIO: FullPersonDTO;
  // user: Person;
 
  message: string;
  
  constructor(
    private dataService: DataService,
    public matDialog: MatDialog,

    
    @Inject(MAT_DIALOG_DATA) public data: { message: string,},
    public dialogRef: MatDialogRef<OrganizationComponent>, //OrganizationModal

    private modalService: ModalActionsService
  ) {
      this.message = data ? data.message :"prueba";
   }

  ngOnInit(): void {
    this.DATAPORTFOLIO = this.dataService.getData();
    this.myData = this.DATAPORTFOLIO.organization
    
    // Verifica si está logueado como ADMIN
    this.flagUserAdmin$ = this.dataService.getFlagChangeUser$();
    this.flagUserAdmin$.subscribe(  flagUserAdmin => this.flagUserAdmin = flagUserAdmin);
    this.flagUserAdmin = this.dataService.getFlagUserAdmin();

    this.resetForm();
  }

  resetForm() {
    this.formData = { 
      id:0, 
      name:"", 
      resume:"",
      url:"",
      person:0 }
  }

  toggleForm() {
    // Cierra el formulario de edicion o creacion
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;

  }  
  
  prueba(data:any) {
    this.myData = data;
    console.log("Prueba function in orga-compoment", this.myData)
    this.myOrganizationsChange.emit(this.myData);
  }

  cancelation(organization: Organization) {
    this.toggleForm();
    
  }

  openModalDelete(organization: Organization){
    // Llamo al modal, si se confirma el borrado.
    // almaceno el item en cuestion en itemParaBorrar
    this.itemParaBorrar = organization;
    this.openDeleteModal(organization)
  }

  
  delItem(){
    if (this.itemParaBorrar) {
      this.dataService.delOrganization(this.itemParaBorrar).subscribe( {
        next: (v) => {
          console.log("Se ha eliminado exitosamente a: ", this.itemParaBorrar);
          this.myData = this.myData.filter((t) => { return t !== this.itemParaBorrar })
          // Actualizo la informacion en el origen
          this.DATAPORTFOLIO.organization = this.myData;
          this.itemParaBorrar = null;
        },
        error: (e) => {
          alert("Response Error (" + e.status + ")" + "\n" + e.message);
          console.log("Se quizo eliminar sin exito a: " , this.itemParaBorrar);
        },
        complete: () => {console.log("Completada la actualizacion del Organization");}

      });
    }
  }


  // upDateItem(organization: Organization) {
  //   this.dataService.updateOrganization(organization).subscribe();
  // }
  
  addItem(organization: Organization) {
    this.dataService.addOrganization(organization).subscribe({
      next: (v) => {
        console.log("Interes guardado correctamente: ", v);
        v.person = this.DATAPORTFOLIO.id;
        this.myData.push(v);
        // Actualizo la informacion en el origen
        this.DATAPORTFOLIO.organization = this.myData;

      },
      error: (e) => {
        alert("Response Error (" + e.status + ") en el metodo addItem()" + "\n" + e.message);
        console.log("Se quizo agregar sin exito a: " + organization.name);
      },
      complete: () => console.log("Completado el alta del hardSkill")
    }
    );
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
      title: `Hola, está por eliminar una de las organizaciones`,
      description: `¿Estás seguro de eliminar a "${data.name}" ?`,
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
