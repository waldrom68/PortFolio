import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Cards } from 'src/app/models';

import { UiService } from 'src/app/service/ui.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {
  faTimes = faTimes;
  faPen = faPen;
  faTrash = faTrash;
   
  // PENDIENTE Esta entrada no la uso para nada
  @Input() detailCard:Cards [];

  @Output() toggleCards = new EventEmitter();
  
  // statusCards:boolean;


  constructor( private miServicio: UiService) {
  
   }


  ngOnInit(): void {
    // this.botones = this.miServicio.getDetalles()
  }

  toggleContenedor(dato:string) {
    this.toggleCards.emit();
    
    this.miServicio.toggleDetalles(dato);
      // console.log(this.miServicio.getDetalles())
      // console.log("hice click para ver detalles", dato)
      // console.log("Y esto es lo que obtengo", this.miServicio.getCards())
    
  }
  

}
