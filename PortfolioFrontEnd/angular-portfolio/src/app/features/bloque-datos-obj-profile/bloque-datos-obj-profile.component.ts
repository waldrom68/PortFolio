import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bloque-datos-obj-profile',
  templateUrl: './bloque-datos-obj-profile.component.html',
  styleUrls: ['./bloque-datos-obj-profile.component.css']
})

export class BloqueDatosObjProfileComponent implements OnInit {

  visibility:any = [
    {"data": true},
    {"profile": true},
    {"objetivo": true},
    {"experiencia": true},
  ];


  name:string = "Walter";
  last_name:string = "Romero";
  foto:string = "../assets/images/ico.svg";

  since:string = "1968"
  location:string = "Bernal, Bs.As. Argentina."
  profession:any = ["Full Stack Developer","PYTHON - JAVA"]

  dataObj: any = {
    "datos": [
      this.name,
      this.last_name,
      this.location,
      this.profession
    ],

    "visible": true,
    "resume": "PERSONALMENTE SOY YO"
  }
 

  perfil:string = `
  Ocupé cargos de RRHH y disfruté mejorar procesos, generar tableros de control para la toma de decisiones, y hacer de "una especie de analista funcional" para servir de enlace entre áreas de negocio y de tecnología. Ciertamente era un Analista Universitario de Sistemas en un área de recursos humanos.
  Luego de 24 años trabajando en la universidad, ahora he vuelto a mi esencia: “creatividad, innovación, sistemas y tecnología”.
  En resumen, además de contar con criterio empresarial tengo conocimientos y experiencia para sumar valor a cualquier proyecto, y quienes me conocen destacarán mi compromiso para alcanzar objetivos, mi lealtad, integridad y disciplina.`

  perfilList:any = this.perfil.split('\n')

  perfilObj: any = {
    "datos": this.perfilList,
    "visible": true,
    "resume": "SOY LO QUE ESTAS BUSCANDO"
  }
  


  objetivo:string = `Me atraen los desafíos y aventuras en donde pueda seguir ayudando, creando, innovando, mejorando ...
  Podés contactarme si tenés alguna idea o propuesta y será un plus si es divertida.`

  objetivoList = this.objetivo.split('\n')

  objetivoObj : any = {
    "datos": this.objetivoList,
    "visible": true,
    "resume": "En resumen, QUIERO LABURAR"
  }


  experiencia:any = [
    {"desde": "20/09/1993", "hasta": "28/02/2018", "empresa": "ITBA", "cargo":"Director mascapito"},
    {"desde": "15/02/1990", "hasta": "30/07/1994", "empresa": "autonomo", "cargo":"Freelance"}
  ];

  experienciaObj:any = {
    "datos": this.experiencia,
    "visible": true,
    "resume": "En resumen, SOY UN GENIO"
  }
 
  constructor() { }

  ngOnInit(): void {
  }

}
