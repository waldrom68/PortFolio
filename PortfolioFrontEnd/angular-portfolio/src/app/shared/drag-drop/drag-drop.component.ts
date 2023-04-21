import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, CdkDragEnter, moveItemInArray, CdkDragExit } from '@angular/cdk/drag-drop';
import { FullPersonDTO, HardSkill } from 'src/app/models';
import { Subscription } from 'rxjs';
import { BaseDataService } from 'src/app/service/data.service';
import { AbstractControl } from '@angular/forms';
import { HammerLoader } from '@angular/platform-browser';
import { faArrowDownAZ, faArrowDownZA, faArrowDown19, faArrowDown91, faUpDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})



export class DragDropComponent implements OnInit, OnDestroy {
  // https://material.angular.io/cdk/drag-drop/overview
  // https://blog.openreplay.com/drag-and-drop-with-angular-material/
  // https://www.positronx.io/angular-drag-and-drop-tutorial-with-example/
  // https://stackblitz.com/edit/angular-avfyze?file=app%2Fcdk-drag-drop-connected-sorting-example.ts

  @Input() listToOrdered: any[];
  @Output() listToOrderedChange = new EventEmitter<any>();

  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onUpDate: EventEmitter<any> = new EventEmitter();

  faArrowDownAZ = faArrowDownAZ;
  faArrowDownZA = faArrowDownZA;
  faArrowDown19 = faArrowDown19;
  faArrowDown91 = faArrowDown91;
  faUpDown = faUpDown;

  baseData: FullPersonDTO;
  private BaseDataServiceSubscription: Subscription | undefined;

  // listToOrdered: any[] = [];
  oldData: any;

  realChange = new Array();

  compareObjects(object1: any, object2: any): any {
    let cambios = new Array();
    let clave: any;
    Object.keys(object1).forEach((control: any) => {
      // console.log(control);

      const typedControl: any = object1[control];
      if (typedControl != object2[control]) {
        clave = control;
        cambios[clave] = { key: control, "newValue": typedControl }
      }

    });
    console.log(`Hubo concretamente ${Object.keys(cambios).length} cambios`);

    return Object.keys(cambios).length > 0 ? cambios : null;
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listToOrdered, event.previousIndex, event.currentIndex);
  }



  constructor(
    private baseDataService: BaseDataService,
  ) {
    this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
      currentData => {
        this.baseData = currentData;
        this.oldData = Object.assign({}, this.listToOrdered);
      }
    );
  }

  ngOnInit(): void {
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    
    // this.listToOrdered = this.baseData.hardskill;
    console.log("Esto tengo el oldDAta, en el init()", this.oldData);
  }

  ngOnDestroy(): void {
    this.BaseDataServiceSubscription?.unsubscribe();
  }



  processReordering() {
    console.log("llegue a drag-drop processReordering");
    
    this.realChange = this.compareObjects(this.listToOrdered, this.oldData)
    if (this.realChange?.length > 0) {
      console.log("Registrar estos cambios: ", this.realChange);
      for (let elemento = 0; elemento < this.listToOrdered.length; elemento++) {
        const element = this.listToOrdered[elemento];
        element.orderdeploy = elemento + 1;

      }
      // this.onUpDate.emit();
      this.listToOrderedChange.emit(this.listToOrdered);
      // PENDIENTE, this.listToOrdered es lo que debo emitir hacia el padre para la persistencia
      // Y esto debe eliminarse
      // this.baseData.hardskill = this.listToOrdered;
      // this.baseDataService.setCurrentBaseData(this.baseData);
      // console.log("Hice click en guardar, esto quedó en listToOrdered ? ", this.listToOrdered);
      // console.log("Hice click en guardar, esto queda baseData.hardskill ? ", this.baseData.hardskill);
    } else {
      console.log("No hubo cambios para procesar");
      
    }
    
  }
  
  onDragEnded() {
    console.log("llegue a drag-drop onDragEnded");
    
    this.onCancel.emit();
    // this.baseData.hardskill = this.oldData;
    // this.baseDataService.setCurrentBaseData(this.baseData);
    this.deployOrdered();

    // PENDIENTE, esto debiera eliminarse, oldData es lo que debo emitir al padre
    // console.log("Hice click en cancelar, esto queda en listToOrdered ? ", this.listToOrdered);
    // console.log("Hice click en cancelar, esto queda baseData.hardskill ? ", this.baseData.hardskill);

  }


  nameOrder = true;
  nameOrdered() {
    if (this.nameOrder) {
      this.listToOrdered.sort((a: any, b: any) => 
        a.name.localeCompare(b.name)
      );
      
    } else {
      this.listToOrdered.sort((a: any, b: any) => 
      b.name.localeCompare(a.name)
      );
      
    }
    this.nameOrder = !this.nameOrder;
  }


  assessmentOrder = true;
  assessmentOrdered() {
    this.listToOrdered.sort((a: any, b: any) =>
      a.assessment - b.assessment
    );
    if (this.assessmentOrder) {
      this.listToOrdered.sort((a: any, b: any) =>
      a.assessment - b.assessment
    );
    } else {
      this.listToOrdered.sort((a: any, b: any) =>
      b.assessment - a.assessment
    );
    }
    this.assessmentOrder = !this.assessmentOrder;
  }


  deployOrdered() {
    this.listToOrdered.sort((a: any, b: any) =>
      a.orderdeploy - b.orderdeploy ||
      a.id - b.id ||  // PENDIENTE Esto debiera borrarse
      a.resume?.localeCompare(b.resume) ||
      a.name?.localeCompare(b.name)
    );
  }


}
