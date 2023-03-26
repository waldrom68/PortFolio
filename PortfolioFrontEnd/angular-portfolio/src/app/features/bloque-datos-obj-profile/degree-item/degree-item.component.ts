import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Degree, FullPersonDTO, Mensaje } from '../../../models'

import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';

@Component({
  selector: 'app-degree-item',
  templateUrl: './degree-item.component.html',
  styleUrls: ['./degree-item.component.css']
})
export class DegreeItemComponent implements OnInit, OnDestroy {

  @Input() item: Degree;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<Degree> = new EventEmitter()
  @Output() onUpdate: EventEmitter<Degree> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<Degree> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;
  // formData: Degree; // Viene por un input
  oldData: Degree;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;
  
  constructor(
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
      }
    );
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)

    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );

  }

  ngOnDestroy() {

    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();

  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(degree: Degree) {
    this.showForm = !this.showForm;
    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)
  }

  delete(degree: Degree) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(degree);
    }
  }

  update(degree: Degree) {
    this.dataService.upDateEntity(degree, "/degree").subscribe({
      next: (v) => {
        console.log("Guardado correctamente: ", v);

        this.alertDialog(
          "ok",
          ['Datos guardados exitosamente'],
          1500 );

        // Debo actualizar dataBase, studie, la cual es copia del backend.
        // Como sólo se busca la info al iniciar el sistema, debo mantener una imagen
        // de lo que hago en la DB. 
        // Aquí lo hago para que se actualicen todas las formaciones/estudio que 
        // contienen el Nivel modificado, caso contrario, no se actualizaran 
        // las mismas en el listado de otras formaciones que contengan el mismo 
        // nivel.
        this.baseData.studie.forEach(element => {
          if (element.degree.id == degree.id)
            element.degree.name = degree.name;
        });
      
      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + this.oldData.name);
        msg.push(e.message);
        this.alertDialog("error", msg, 0 );

        console.log("Se quizo modificar sin exito a: " + degree.name);
        // Restauro valor original
        degree = this.oldData;
      },
      complete: () => console.log("Completada la actualizacion del Nivel de Formacion")
    });

    this.toggleForm(degree);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData);

  }

  cancelation(degree: Degree) {
    this.toggleForm(degree);  // cierro el formulario
  }

  // Mensaje de alerta.
  // type: "ok", "error", "info"
  alertDialog( type:string="ok", data:string[], timer:number=0) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-warn";

    // dialogConfig.height = "350px";
    // dialogConfig.width = "600px";
    // dialogConfig.maxWidth = '700px';
    dialogConfig.data = new Mensaje(type, data, timer)


    const dialogRef = this.dialog.open(MatAlertComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(() => console.log("Cerrando alert-modal"));
  }


}
