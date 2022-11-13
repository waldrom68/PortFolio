import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-button-user',
  templateUrl: './add-button-user.component.html',
  styleUrls: ['./add-button-user.component.css']
})
export class AddButtonUserComponent implements OnInit {

  @Input() textBtnAdd: string;
  @Input() BGcolor: string;
  @Input() FGcolor: string;

  @Output() btnClick = new EventEmitter();

  constructor() { 

  }

  ngOnInit(): void {
  }

  onClick(target: any) {
    this.btnClick.emit()
  }
}
