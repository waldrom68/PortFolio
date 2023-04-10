import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Cards } from 'src/app/models';
import { AdminService } from 'src/app/service/auth.service';

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
  // Validacion Admin STATUS
  esAdmin: boolean;
  private AdminServiceSubscription: Subscription | undefined;


  constructor( 
    private miServicio: UiService,
    private adminService: AdminService,
    
    ) {
  
   }


  ngOnInit(): void {
    // this.botones = this.miServicio.getDetalles()
    this.AdminServiceSubscription = this.adminService.currentAdmin.subscribe(
      currentAdmin => {
        this.esAdmin = currentAdmin;
      }
    );
  }

  toggleContenedor(dato:string) {
    this.toggleCards.emit();
    
    this.miServicio.toggleDetalles(dato);
      // console.log(this.miServicio.getDetalles())
      // console.log("hice click para ver detalles", dato)
      // console.log("Y esto es lo que obtengo", this.miServicio.getCards())
    
  }
  

}
