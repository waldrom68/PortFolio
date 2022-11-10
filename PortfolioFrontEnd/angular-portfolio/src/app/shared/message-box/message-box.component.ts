import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.css']
})
export class MessageBoxComponent implements OnInit {
  displayStyle = "block";
    
  displayAlert = true;

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;

  constructor(

    ) {
      
    }

  ngOnInit() {
  }

   
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  public decline() {
    this.displayAlert = false;
    console.log("rechazó")
  }
  
  public accept() {
    this.displayAlert = false;
    console.log("aceptó")
    // this.activeModal.close(true);
  }
  
  public dismiss() {
    console.log("ignoró")
    this.displayAlert = false;
    // this.activeModal.dismiss();

  }
}
