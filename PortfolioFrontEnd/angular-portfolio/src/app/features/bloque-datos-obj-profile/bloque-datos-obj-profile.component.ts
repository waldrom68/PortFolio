import { Component, NgModule, OnInit } from '@angular/core';
import { faL, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  
  enableCard: boolean = true
  enableDet: boolean = false

  showDatos: Boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  onClick(evento:any) {
    alert("estoy aqui")
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


