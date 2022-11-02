import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// Custom validation password field, y clase Empleado
import { createPasswordStrengthValidator, datosExperiencia, datosPersonales } from '../features.model';

@Component({
  selector: 'app-bloque-datos-obj-profile',
  templateUrl: './bloque-datos-obj-profile.component.html',
  styleUrls: ['./bloque-datos-obj-profile.component.css']
})


export class BloqueDatosObjProfileComponent implements OnInit {


  visibility = {
    "dataObj": true,
    "perfilObj": true,
    "objetivoObj": true,
    "experienciaObj": true,
    }
  


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

    "visible": this.visibility.dataObj,
    "resume": "PERSONALMENTE SOY YO"
  }
 
 
  mi_experiencia:datosExperiencia[] = [
  new datosExperiencia("20/09/1993", "28/02/2018", "ITBA", "Director mascapito"),
  new datosExperiencia("15/02/1990", "30/07/19918", "autonomo", "Freelance"),
  ]
  
  newDatos = new datosPersonales(
    "Walter", 
    "Romero", 
    "../assets/images/ico.svg", 
    "Bernal, Bs.As. Argentina.", 
    "Full Stack Developer\nPYTHON - JAVA",

    `Ocupé cargos de RRHH y disfruté mejorar procesos, generar tableros de control para la toma de decisiones, y hacer de "una especie de analista funcional" para servir de enlace entre áreas de negocio y de tecnología. Ciertamente era un Analista Universitario de Sistemas en un área de recursos humanos.
    Luego de 24 años trabajando en la universidad, ahora he vuelto a mi esencia: “creatividad, innovación, sistemas y tecnología”.
    En resumen, además de contar con criterio empresarial tengo conocimientos y experiencia para sumar valor a cualquier proyecto, y quienes me conocen destacarán mi compromiso para alcanzar objetivos, mi lealtad, integridad y disciplina.`,

    `Me atraen los desafíos y aventuras en donde pueda seguir ayudando, creando, innovando, mejorando ...
    Podés contactarme si tenés alguna idea o propuesta y será un plus si es divertida.`, 

    "1968",
    this.mi_experiencia,
    "SOY CLARAMENTE EL INDICADO"
  );

  message: string = "Mensaje desde el hijo: BloqueDatosObjProfileComponent"


   
  constructor() { }

  ngOnInit(): void {
  }

}


