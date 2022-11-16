import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Cards } from 'src/app/data';

import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {
  faTimes = faTimes;
  
  @Input() frontText: string;
  @Input() backText: string;
  @Input() tittle:string;
  @Input() statusCards:boolean;
  
  // @Input() data:string[];
  
  @Input() detailCard:Cards [];


  @Output() toggleCards = new EventEmitter();

  enableCard: boolean = true
  enableDet: boolean = false
  
  // botones:any

  constructor( private miServicio: UiService) { }


  ngOnInit(): void {
    // this.botones = this.miServicio.getDetalles()
  }

  toggleContenedor(dato:string) {
    // PENDIENTE resolver esta chanchada en el codigo, VER EL EMIT
    this.statusCards = !this.statusCards
    //  ----------------------------------------------------------
    // this.enableDet = !this.enableDet
    this.toggleCards.emit();
    this.miServicio.muestraDetalles(dato);
    // console.log(this.miServicio.getDetalles())
    
  }
  
  onClick(target: any) {
    // PENDIENTE resolver esta chanchada en el codigo, VER EL EMIT
    this.statusCards = !this.statusCards
    //  ----------------------------------------------------------
    console.log("\nEmito el click en el detalle y emito el toggleCards.emit\n[detalle del Card -data-card-component.ts-]")
    this.toggleCards.emit()
    this.miServicio.ocultarDetalles();
    }
}
