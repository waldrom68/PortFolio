import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {
  @Input() frontText: string;
  @Input() backText: string;

  @Output() btnClick = new EventEmitter();


  enableCard: boolean = true
  enableDet: boolean = false
  constructor() { }


  ngOnInit(): void {
  }

  toggleContenedor() {
    this.enableCard = !this.enableCard
    this.enableDet = !this.enableDet
    }

  onClick(target: any) {
    console.log("emito el click desde el data-card-component.ts")
    this.btnClick.emit()
    }
}
