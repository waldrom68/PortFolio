import { Component, EventEmitter, Input, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent implements OnInit {
  @Input() listToOrdered: any[];
  @Output() listToOrderedChange = new EventEmitter<any>();

  message: string;

  @Output() onCancel: EventEmitter<any> = new EventEmitter();
  @Output() onUpDate: EventEmitter<any> = new EventEmitter();
  constructor(
    public matDialog: MatDialog,
    public dialog: MatDialog,
    
    @Inject(MAT_DIALOG_DATA) public data: { listToOrdered: any[], },
    public dialogRef: MatDialogRef<ContainerListComponent>, //OrganizationModal

  ) { }

  ngOnInit(): void {
    this.listToOrdered = this.data["listToOrdered"]
    console.log(this.data);
    
  }

  sendOrderList(lista:any) {
    console.log("Recibo esto en container-list", lista);
    this.listToOrdered = lista;
    this.listToOrderedChange.emit(this.listToOrdered);

  }

  cancel() {
    console.log("llegue hasta el cancel de container-list");
    
    this.onCancel.emit();
  }
}
