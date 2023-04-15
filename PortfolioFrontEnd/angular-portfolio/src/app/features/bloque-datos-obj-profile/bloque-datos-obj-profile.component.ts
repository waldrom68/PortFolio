import { Component, OnInit } from '@angular/core';
import { faL, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UiService } from 'src/app/service/ui.service';



@Component({
  selector: 'app-bloque-datos-obj-profile',
  templateUrl: './bloque-datos-obj-profile.component.html',
  styleUrls: ['./bloque-datos-obj-profile.component.css']
})


export class BloqueDatosObjProfileComponent implements OnInit {
  faTimes = faTimes;
  enableCardObj: boolean = true
  enableDetObj: boolean = false
  enableCardExp: boolean = true
  enableDetExp: boolean = false
  enableCardDat: boolean = true
  enableDetDat: boolean = false
  enableCardPerfil: boolean = true
  enableDetPerfil: boolean = false
   
  enableDet: boolean = false
  showDatos: Boolean = false
  enableCard: boolean = true
  

  // Variable que controla si se muestrasn las tarjetas, si muestra detalle,
  // las tarjetas se deben ocultar
  statusCards: boolean = true;

  // botones:any

  detailCards:any;

  CardsGroup1: any;
  CardsGroup2: any;


  alPadre() {
    alert("\nLlegue al Bloque principal\n [bloque-datos-obj-profile.component.ts]")
    this.statusCards = true;
  }

  ocultarCards() {
    this.statusCards = false;
  }

  toggle(elemento:string) {
    this.miServicio.toggleDetalles(elemento);
  }

  constructor(private miServicio: UiService) { }

  ngOnInit(): void {
    // this.botones = this.miServicio.getDetalles();
    // this.detailCards = this.miServicio.getCards()

    this.CardsGroup1 = this.detailCards.filter(function (elem:any)
        { return elem.group == 1; }  ) 
    this.CardsGroup2 = this.detailCards.filter(function (elem:any)
        { return elem.group == 2; }  ) 
  }






  // Metodos de la version anterior sin servicios
  onClick(evento:any) {
  this.showDatos = !this.showDatos
  }
  toggleContenedorObj() {
  this.enableCardObj = !this.enableCardObj
  this.enableDetObj = !this.enableDetObj
  }
  toggleContenedorExp() {
  this.enableCardExp = !this.enableCardExp
  this.enableDetExp = !this.enableDetExp
  }
  toggleContenedorDat() {
  this.enableCardDat = !this.enableCardDat
  this.enableDetDat = !this.enableDetDat
  }
  toggleContenedorPerfil() {
  this.enableCardPerfil = !this.enableCardPerfil
  this.enableDetPerfil = !this.enableDetPerfil
}
}


