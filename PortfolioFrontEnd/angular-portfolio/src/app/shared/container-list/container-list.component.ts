import { Component, EventEmitter, Input, OnInit, Inject, Output, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent implements OnInit, OnDestroy {
  @Input() listToOrdered: any;
  @Output() listToOrderedChange = new EventEmitter<any>();
  fields:string[];
  message: string;

  
  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onUpDate: EventEmitter<any> = new EventEmitter();

  oldData: any[];
  copy: [];
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


  constructor(
    public matDialog: MatDialog,
    public dialog: MatDialog,
    
    @Inject(MAT_DIALOG_DATA) public data: { listToOrdered: any, fields: string[] },
    public dialogRef: MatDialogRef<ContainerListComponent>, //OrganizationModal

  ) { }

  ngOnInit(): void {

    this.listToOrdered = this.data["listToOrdered"]
    this.fields = this.data.fields? this.data.fields :  ["name"];
    this.oldData = Object.assign({}, this.data["listToOrdered"]) ;

    // pruebas de cclone, es decir sin mantener referencia a la original
    // this.oldData = JSON.parse(JSON.stringify(this.data["listToOrdered"])) as typeof this.data["listToOrdered"];
    // console.log(this.oldData);
    // this.oldData = [...this.data["listToOrdered"]]
    
  }

  ngOnDestroy(): void {

    delete this.matDialog;
    delete this.dialog;
    delete this.dialogRef;

    
  }

  sendOrderList(lista:any) {
    this.processReordering();
    this.listToOrdered = lista;
    this.listToOrderedChange.emit(this.listToOrdered);
  }

  cancel() {
    // PENDIENTE, solucion de compromiso para revertir cambios
    for (let index = 0; index < this.listToOrdered.length; index++) {
      const element = this.oldData[index];
      this.listToOrdered[index] = element;
    }

    // prueba 1
    // this.listToOrdered = JSON.parse(JSON.stringify(this.oldData)) as typeof this.oldData;
    // prueba 2
    // this.listToOrdered = [...this.oldData];

    this.listToOrderedChange.emit(this.listToOrdered);
    this.onCancel.emit();
  }

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
      console.log("esto es lo que queda despues de processReordering", this.listToOrdered);
      
      this.listToOrderedChange.emit(this.listToOrdered);

    } else {
      console.log("No hubo cambios para procesar");
    }
    
  }

}
