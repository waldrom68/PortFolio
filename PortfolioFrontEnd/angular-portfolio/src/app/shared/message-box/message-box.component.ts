import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  // displayStyle = "block";
  displayAlert: boolean = false
  
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

   
  openPopup() {
    // this.displayStyle = "block";
    this.displayAlert = true;
  }
  closePopup() {
    // this.displayStyle = "none";
    this.displayAlert = false;
  }

  public decline() {
    this.closePopup()
    this.onBtnClick.emit(false);
  }
  
  public accept() {
    this.closePopup()
    this.onBtnClick.emit(true);

  }
  
  public dismiss() {

    this.openPopup()
    this.onBtnClick.emit(false);


  }

 
}
