import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-card',
  templateUrl: './personal-card.component.html',
  styleUrls: ['./personal-card.component.css']
})


export class PersonalCardComponent implements OnInit {

  name:string = "Walter";
  last_name:string = "Romero";
  foto:string = "../assets/images/ico.svg";

  since:string = "1968"
  location:string = "Bernal, Bs.As. Argentina."
  profession:any = ["Full Stack Developer","PYTHON - JAVA"]



  
  perfil:string = `
  Ocupé cargos de RRHH y disfruté mejorar procesos, generar tableros de control para la toma de decisiones, y hacer de "una especie de analista funcional" para servir de enlace entre áreas de negocio y de tecnología. Ciertamente era un Analista Universitario de Sistemas en un área de recursos humanos.
  Luego de 24 años trabajando en la universidad, ahora he vuelto a mi esencia: “creatividad, innovación, sistemas y tecnología”.
  En resumen, además de contar con criterio empresarial tengo conocimientos y experiencia para sumar valor a cualquier proyecto, y quienes me conocen destacarán mi compromiso para alcanzar objetivos, mi lealtad, integridad y disciplina.`

  perfilList:any = this.perfil.split('\n')

  objetivo:string = `Me atraen los desafíos y aventuras en donde pueda seguir ayudando, creando, innovando, mejorando ...
  Podés contactarme si tenés alguna idea o propuesta y será un plus si es divertida.`

  objetivoList = this.objetivo.split('\n')



  elementos: any = [
    {"label": "Perfil", "datos": this.perfilList },
    {"label": "Objetivo", "datos": this.objetivoList },
    {"label": "Experiencia", "datos": ["MI EXPERIENCIA"] },
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
