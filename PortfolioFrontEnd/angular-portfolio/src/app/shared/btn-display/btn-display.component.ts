import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-btn-display',
  templateUrl: './btn-display.component.html',
  styleUrls: ['./btn-display.component.css']
})
export class BtnDisplayComponent implements OnInit {
  @Input() textBtnAdd: string;
  @Input() BGcolor: string;
  @Input() FGcolor: string;

  @Output() btnClick = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  onClick(target: any) {
    this.btnClick.emit()
  }
}
