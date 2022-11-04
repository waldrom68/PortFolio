import {Data, Formacion, HardSkill, SoftSkill, Intereses, WorkExperience, Users} from './data'


export const USERS: Users[] = [
    {
        id: 1,
        username: "waldrom",
        password: "tomate"
    }
]
   


export const DATA: Data = 
    {
    id: 1,
    name : "Walter",
    last_name : "Romero",
    foto: "../assets/images/ico.svg",
    location : "Bernal, Bs.As. Argentina.",
    profession : ["Full Stack Developer","PYTHON - JAVA"],
    profile :["Ocupé cargos de RRHH y disfruté mejorar procesos, generar tableros de control para la toma de decisiones, y hacer de 'una especie de analista funcional' para servir de enlace entre áreas de negocio y de tecnología. Ciertamente era un Analista Universitario de Sistemas en un área de recursos humanos.","Luego de 24 años trabajando en la universidad, ahora he vuelto a mi esencia: 'creatividad, innovación, sistemas y tecnología'.","En resumen, además de contar con criterio empresarial tengo conocimientos y experiencia para sumar valor a cualquier proyecto, y quienes me conocen destacarán mi compromiso para alcanzar objetivos, mi lealtad, integridad y disciplina."],
    objetive : ["Me atraen los desafíos y aventuras en donde pueda seguir ayudando, creando, innovando, mejorando ...","Podés contactarme si tenés alguna idea o propuesta y será un plus si es divertida."],
    since : "1968",
    experiencia_resume : "SOY CLARAMENTE EL INDICADO",
    }


export const FORMACION: Formacion[] = [
    {
        id: 1,
        start_date:"3/1990",
        end_date:"12/1996",
        institution:"UCALP",
        degree:"Analista de sistemas",
    },
    {
        id: 2,
        start_date:"3/1990",
        end_date:"12/1996",
        institution:"EDUCACION IT",
        degree:"Full Stack Python",
    }
]


export const WORKEXPERIENCE: WorkExperience[] =[
    {
    id: 1,
    start_date:"09-1993",
    end_date:"02-2018",
    organization:"ITBA",
    position:"Director"
}, 
{
    id: 2,
    start_date:"09-1990",
    end_date:"12-1993",
    organization:"freelance",
    position:"Programador"
}, 
] 

export const HARDSKILL: HardSkill[] = [
    {
    id: 1,
    name:"Python",
    assessment:65,
},
    {
    id: 2,
    name:"html",
    assessment:50,
},
    {
    id: 1,
    name:"CSS3",
    assessment:45,
}
]

export const SOFTSKILL: SoftSkill[] = [
    {
        id: 1,
        name:"Amabilidad",
        assessment:7,
    },
    {
        id: 2,
        name:"Respeto",
        assessment:6,
    },
    {
        id: 3,
        name:"Integridad",
        assessment:9,
    }
] 

export const INTERESES: Intereses[] = [
   {
    id: 1,
    name:"Paddel",
    },
   {
    id: 2,
    name:"Viajar",
    }
]
