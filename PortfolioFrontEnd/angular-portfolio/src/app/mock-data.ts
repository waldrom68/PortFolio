import {Data, Formacion, HardSkill, SoftSkill, Intereses, WorkExperience, User, Cards, DisplayData} from './data'

import { PortfolioInit } from './data'

export const USERS: User[] = [
    {
        id: 1,
        username: "waldrom",
        password: "tomate",
        "admin": false
    }
]


export const DATA: Data = 
    {
    id: 1,
    name : "Walterio",
    lastname : "Mock",
    foto: "../assets/images/ico.svg",
    location : "Bernal, Bs.As. Argentina.",
    profession : ["Full Stack Developer","PYTHON - JAVA"],
    profile :["Mock cargos de RRHH y disfruté mejorar procesos, generar tableros de control para la toma de decisiones, y hacer de 'una especie de analista funcional' para servir de enlace entre áreas de negocio y de tecnología. Ciertamente era un Analista Universitario de Sistemas en un área de recursos humanos.","Luego de 24 años trabajando en la universidad, ahora he vuelto a mi esencia: 'creatividad, innovación, sistemas y tecnología'.","En resumen, además de contar con criterio empresarial tengo conocimientos y experiencia para sumar valor a cualquier proyecto, y quienes me conocen destacarán mi compromiso para alcanzar objetivos, mi lealtad, integridad y disciplina."],
    objetive : ["Mock atraen los desafíos y aventuras en donde pueda seguir ayudando, creando, innovando, mejorando ...","Podés contactarme si tenés alguna idea o propuesta y será un plus si es divertida."],
    since : "1948",
    experiencia_resume : "Mock SOY CLARAMENTE EL INDICADO",
    }


export const FORMACION: Formacion[] = [
    {
        id: 1,
        start_date:"3/1990",
        end_date:"12/1996",
        institution:"UCALP",
        degree:"Mock Analista de sistemas",
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
    organization:"Mock ITBA",
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
    name:"Mock Python",
    assessment:65,
    orderdeploy:0,
    person:1
},
    {
    id: 2,
    name:"html",
    assessment:50,
    orderdeploy:0,
    person:1
},
    {
    id: 1,
    name:"CSS3",
    assessment:45,
    orderdeploy:0,
    person:1
}
]

export const SOFTSKILL: SoftSkill[] = [
    {
        id: 1,
        name:"Mock Amabilidad",
        assessment:7,
        orderdeploy:0,
        person:1
    },
    {
        id: 2,
        name:"Respeto",
        assessment:6,
        orderdeploy:0,
        person:1
    },
    {
        id: 3,
        name:"Integridad",
        assessment:9,
        orderdeploy:0,
        person:1
    }
] 

export const INTERESES: Intereses[] = [
   {
    id: 1,
    name:"Mock Paddel",
    },
   {
    id: 2,
    name:"Viajar",
    }
]


export const CARDS: Cards[] = [
        {
        id:1,
        name: "Perfil",
        status: false,
        group: 1,
        data: "",
        resume: "",
        modelTemplate: "lista",
        userId: 1
    },
    {
        id:2,
        name: "Objetivo",
        status: false,
        group: 1,
        data: "",
        resume: "",
        modelTemplate: "lista",
        userId: 1
    },
    {
    id:3,
    name: "Trayectoria",
    status: false,
    group: 1,
    data: [],
    resume: "",
    modelTemplate: "objeto",
    userId: 1
    },
    {
        id:4,
    name: "Formación",
    status: false,
    group: 1,
    data: [],
    resume: "Analista de Sistemas, MBA, Full-Stack",
    modelTemplate: "lista",
    userId: 1
    },
    {
        id:5,
    name: "Habilidades tecnicas",
    status: false,
    group: 2,
    data: [],
    resume: "Python, Django, JS, Java, Angular, SQL, CSS3, HTML",
    modelTemplate: "lista",
    userId: 1
    },
    {
        id:6,
    name: "Habilidades personales",
    status: false,
    group: 2,
    data: [],
    resume: "Persona integra",
    modelTemplate: "lista",
    userId: 1
    },
    {
        id:7,
    name: "Proyectos",
    status: false,
    group: 2,
    data: [],
    resume: "",
    modelTemplate: "lista",
    userId: 1
    },
    {
        id:8,
    name: "Intereses",
    status: false,
    group: 2,
    data: [],
    resume: "",
    modelTemplate: "lista",
    userId: 1
    }
]

export const PORTFOLIOINIT: PortfolioInit = 
{
    id:1,
    theme: "Dark",
    status: true,
    userId:1,
}

export const DISPLAYDATA: DisplayData = 
{
    id:1,
    name: true,
    lastName: true,
    photo: true,
    location: true,
    profession: true,
    since: true,
    theme: "flip"
}