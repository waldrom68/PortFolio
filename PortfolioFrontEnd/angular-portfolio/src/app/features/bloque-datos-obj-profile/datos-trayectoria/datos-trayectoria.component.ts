import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datos-trayectoria',
  templateUrl: './datos-trayectoria.component.html',
  styleUrls: ['./datos-trayectoria.component.css']
})
export class DatosTrayectoriaComponent implements OnInit {

  @Input() experienciaObj:any

  // @Output() visivility = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit(): void {
  }

}
