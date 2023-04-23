import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CdkDragDrop, CdkDragEnd, CdkDragEnter, moveItemInArray, CdkDragExit } from '@angular/cdk/drag-drop';
// import { FullPersonDTO } from 'src/app/models';
// import { Subscription } from 'rxjs';
// import { BaseDataService } from 'src/app/service/data.service';

import { faArrowDownAZ, faArrowDownZA, faArrowDown19, faArrowDown91, faUpDown } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})



export class DragDropComponent implements OnInit /*, OnDestroy*/ {
  // https://material.angular.io/cdk/drag-drop/overview
  // https://blog.openreplay.com/drag-and-drop-with-angular-material/
  // https://www.positronx.io/angular-drag-and-drop-tutorial-with-example/
  // https://stackblitz.com/edit/angular-avfyze?file=app%2Fcdk-drag-drop-connected-sorting-example.ts

  @Input() listToOrdered: any;
  @Output() listToOrderedChange = new EventEmitter<any>();
  
  @Input() fields: any[];

  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onUpDate: EventEmitter<any> = new EventEmitter();

  faArrowDownAZ = faArrowDownAZ;
  faArrowDownZA = faArrowDownZA;
  faArrowDown19 = faArrowDown19;
  faArrowDown91 = faArrowDown91;
  faUpDown = faUpDown;

  // baseData: FullPersonDTO;
  // private BaseDataServiceSubscription: Subscription | undefined;

  // listToOrdered: any[] = [];
  oldData: any[];

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
    // private baseDataService: BaseDataService,
  ) {
    // this.BaseDataServiceSubscription = this.baseDataService.currentBaseData.subscribe(
    //   currentData => {
    //     this.baseData = currentData;
        
    //   }
    // );
  }

  ngOnInit(): void {
    // Clono el objeto, uso assign por no tener atributos compuesto por otros objetos
    this.oldData = Object.assign({}, this.listToOrdered);

  }

  // ngOnDestroy(): void {
  //   this.BaseDataServiceSubscription?.unsubscribe();
  // }



  processReordering() {
    this.realChange = this.compareObjects(this.listToOrdered, this.oldData)
    if (this.realChange?.length > 0) {

      for (let elemento = 0; elemento < this.listToOrdered.length; elemento++) {
        const element = this.listToOrdered[elemento];
        element.orderdeploy = elemento + 1;

        // DOY FORMATO A LOS CAMPOS DE FECHA
        element.since ? element.since : new Date(),
        'yyyy-MM-dd', 'en', 'UTC-3'
        // DOY FORMATO A LOS CAMPOS DE FECHA
        element.startDate ? element.startDate : new Date(),
        'yyyy-MM-dd', 'en', 'UTC-3'
        // DOY FORMATO A LOS CAMPOS DE FECHA
        element.endDate ? element.endDate : new Date(),
        'yyyy-MM-dd', 'en', 'UTC-3'
      }

      this.listToOrderedChange.emit(this.listToOrdered);

    } else {
      console.log("No hubo cambios para procesar");
    }
    
  }
  
  onDragEnded() {
    // REUBICADO EN COMPONENTE QUE TIENE EL LISTADO, container-list.ts
    // for (let index = 0; index < this.listToOrdered.length; index++) {
    //   const element = this.oldData[index];
    //   this.listToOrdered[index] = element;
    // }
    // this.listToOrderedChange.emit(this.listToOrdered);
    this.onCancel.emit();

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

  
  resumeOrder = true;
  resumeOrdered() {
    if (this.resumeOrder) {
      this.listToOrdered.sort((a: any, b: any) => 
        a.resume.localeCompare(b.resume)
      );
      
    } else {
      this.listToOrdered.sort((a: any, b: any) => 
      b.resume.localeCompare(a.resume)
      );
      
    }
    this.resumeOrder = !this.resumeOrder;
  }


  assessmentOrder = true;
  assessmentOrdered() {
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

  sinceOrder = true;
  sinceOrdered() {
    if (this.sinceOrder) {
      this.listToOrdered.sort((a: any, b: any) =>
      a.since - b.since
    );
    } else {
      this.listToOrdered.sort((a: any, b: any) =>
      b.since - a.since
    );
    }
    this.sinceOrder = !this.sinceOrder;
  }


}
