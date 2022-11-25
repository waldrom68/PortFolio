import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  // displayStyle = "block";
  
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() backColor: string;

  @Output() onBtnClick = new EventEmitter();
  
  
  constructor() {
    }

  ngOnInit() {
    console.log("iniciando el message-box")
  }

   
  openModal() {
    // this.displayStyle = "block";
    console.log("Abriendo el Modal")
  }
  closeModal() {
    // this.displayStyle = "none";
    console.log("Cerrando el modal")
  }

  public decline() {
    this.closeModal()
    this.onBtnClick.emit(false);
  }
  
  public accept() {
    this.closeModal()
    this.onBtnClick.emit(true);

  }
  
  public dismiss() {

    this.openModal()
    this.onBtnClick.emit(false);


  }

 
}
