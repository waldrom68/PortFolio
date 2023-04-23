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

}
