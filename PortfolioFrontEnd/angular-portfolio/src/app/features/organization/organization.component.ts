import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

import {Person, Organization} from '../../data'

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageBoxComponent } from '../../shared/message-box/message-box.component';
import { ModalActionsService } from 'src/app/service/modal-actions.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
 

  // PENDIENTE: SERVICIO QUE DEBE VINCULARSE CON EL LOGUEO
  flagUserAdmin: boolean = false;
  flagUserAdmin$: Observable<boolean>;
  showForm: boolean = false;  // flag para mostrar o no el formulario

  // softskill: SoftSkill[] = SOFTSKILL;
  myData: Organization[] = [];
  formData: Organization;  // instancia vacia, para cuando se solicite un alta

  faPlusCircle = faPlusCircle;
  faTimes = faTimes;

  @Input() showBtnAction: boolean= true;  // flag para mostrar o no los btn's de acciones del usuario
  @Output() showBtnActionChange = new EventEmitter<boolean>();
  showOrga: boolean= true;

  private itemParaBorrar: Organization;
  flagBorrado: boolean = false;
  flagBorrado$: Observable<boolean>;

  user: Person;

  
  constructor(
    private dataService: DataService,
    
     
    public matDialog: MatDialog,
    private modalService: ModalActionsService
  ) { }

  ngOnInit(): void {
    this.dataService.getOrganization().subscribe(organization =>
      [this.myData = organization]
    );
    this.dataService.getGralData().subscribe(data =>
      this.user = data
    ) ;

    // subscribo y me entero si se cambia el status del flag  
    this.flagBorrado$ = this.modalService.getFlagBorrado$();
    this.flagBorrado$.subscribe( (tt)=> {
      console.log(`Se acepto el borrado del item "${this.itemParaBorrar.name}"`);
      this.myData = this.myData.filter( (t) => { return t.id !== this.itemParaBorrar.id } )
    }
    )

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
    this.showForm = !this.showForm;
    this.showBtnAction = !this.showBtnAction;

  }  
  
  closeOrga() {
    this.showOrga = !this.showOrga;
    this.showBtnAction = true;
    this.showBtnActionChange.emit(this.showBtnAction)

  }

  cancelation(organization: Organization) {
    this.toggleForm();
    
  }

  deleteItem(organization: Organization){
    this.itemParaBorrar = organization;
    this.openDeleteModal(organization)
  }

  upDateItem(organization: Organization) {
    this.dataService.updateOrganization(organization).subscribe();
  }
  
  addItem(organization: Organization) {
    this.dataService.addOrganization(organization).subscribe( (tt)=> {
      this.myData.push( tt );
      this.toggleForm();
    }
    );
    this.resetForm();
    
  }

  openDeleteModal(data:any) {
    // Acciones definidas en el modal-action.service.ts
    // PENDIENTE, RECUPERAR EL VALOR DE USER NAME PARA PASARLO AL MSG.
    const userId = this.user.name;
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    dialogConfig.data = {
      // atributos generales del message-box
      name: "delOrganization",
      title: `Hi ${userId}, está por eliminar una de las organizaciones`,
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

  }



}
