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
   
  @Input() detailCard:Cards [];

  @Output() toggleCards = new EventEmitter();
  
  // statusCards:boolean;


  constructor( private miServicio: UiService) {
    // this.statusCards = this.miServicio.getStatusCards()
   }


  ngOnInit(): void {
    // this.botones = this.miServicio.getDetalles()
  }

  toggleContenedor(dato:string) {
    // PENDIENTE resolver esta chanchada en el codigo, VER EL EMIT
    //  ----------------------------------------------------------
    // this.enableDet = !this.enableDet
    this.toggleCards.emit();
    this.miServicio.muestraDetalles(dato);
      // console.log(this.miServicio.getDetalles())
      console.log("hice click para ver detalles", dato)
      console.log("Y esto es lo que obtengo", this.miServicio.getCards())
    
  }
  
//   onClick(target: any) {
//     // PENDIENTE resolver esta chanchada en el codigo, VER EL EMIT
//     //  ----------------------------------------------------------
//     console.log("\nEmito el click en el detalle y emito el toggleCards.emit\n[detalle del Card -data-card-component.ts-]")
//     this.toggleCards.emit()
//     this.miServicio.ocultarDetalles();
//     }
}
