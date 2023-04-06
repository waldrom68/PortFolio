import { Component, EventEmitter, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { FullPersonDTO, Mensaje, SocialNetwork } from 'src/app/models';
import { faTrash, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { BaseDataService, DataService } from 'src/app/service/data.service';
import { AdminService } from 'src/app/service/auth.service';

import { IconPrefix, IconName, library } from '@fortawesome/fontawesome-svg-core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { MatAlertComponent } from 'src/app/shared/mat-alert/mat-alert.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-social-item',
  templateUrl: './social-item.component.html',
  styleUrls: ['./social-item.component.css']
})
export class SocialItemComponent implements OnInit, OnDestroy {

  @Input() item: SocialNetwork;

  @Input() formData: SocialNetwork;

  @Input() showBtnAction!: boolean;
  @Output() showBtnActionChange = new EventEmitter<boolean>();

  @Output() onDelete: EventEmitter<SocialNetwork> = new EventEmitter()
  @Output() onUpdate: EventEmitter<SocialNetwork> = new EventEmitter()
  @Output() onToggleForm: EventEmitter<SocialNetwork> = new EventEmitter()

  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;

  showForm: boolean = false;

  oldData: SocialNetwork;

  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  // Prefix de los iconos de @fontawesome
  iconPrefix: IconPrefix = 'fab'


  constructor(
    private library: FaIconLibrary,
    private uiService: UiService,
    
    private dataService: DataService,
    private adminService: AdminService,
    private baseDataService: BaseDataService,
    private dialog: MatDialog,


  ) {
    library.addIconPacks(fab);
  }



  ngOnInit(): void {
    // this.oldData = this.item;
    // this.oldData = this.item;
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
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.item)



  }

  ngOnDestroy() {
    this.AdminServiceSubscription?.unsubscribe();
    this.BaseDataServiceSubscription?.unsubscribe();
  }


  iconExists(prefix: IconPrefix, name: IconName): boolean {
    return this.library.getIconDefinition(prefix, name) != null;
  }

  color: string = 'red';

  changeStyle($event: Event) {
    this.color = $event.type == 'mouseover' ? 'resaltado' : 'normal';
  }

  toggleForm(socialnetwork: SocialNetwork) {
    this.showForm = !this.showForm;
    this.formData = socialnetwork;

    // habilito las acciones de cada item
    this.showBtnAction = !this.showBtnAction
    this.showBtnActionChange.emit(this.showBtnAction)

  }

  delete(socialnetwork: SocialNetwork) {
    // llamo al metodo del padre via emit() que lo enlaza con openModalDelete(item)
    if (this.esAdmin) {
      this.onDelete.emit(socialnetwork);
    }

  }

  update(socialnetwork: SocialNetwork) {
    // Actualizacion de Interest
    this.dataService.upDateEntity(socialnetwork, "/socialnetwork").subscribe({
      next: (v) => {
        this.uiService.msgboxOk( ['Datos obtenidos exitosamente'],);
        console.log("Guardado correctamente")

      },
      error: (e) => {
        let msg = new Array()
        msg.push("Se quizo modificar sin exito a: " + this.oldData.name);
        msg.push(e.error.mensaje ? e.error.mensaje : e.message);
        this.uiService.msgboxErr( msg,); 
        
        console.log("Se quizo modificar sin exito a: " + this.oldData.name);
        // Restauro valor original
        socialnetwork.iconname = this.oldData.iconname;
        socialnetwork.name = this.oldData.name;
        socialnetwork.url = this.oldData.url;
      },
      complete: () => console.log("Completada la actualizacion de la red social")
    });

    this.toggleForm(socialnetwork);  // cierro el formulario
    this.baseDataService.setCurrentBaseData(this.baseData);

  }

  cancelation(socialnetwork: SocialNetwork) {
    this.toggleForm(socialnetwork);  // cierro el formulario
  }

}
