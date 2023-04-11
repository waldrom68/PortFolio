import { Data, Formacion, Intereses, WorkExperience, User, Card } from '../../app/models'

import { PortfolioInit } from '../../app/models'

// MODELO NO IMPLEMENTADO AUN EN EL FRONTEND, Entidad vacía en la DB, backend implementado

// private long id;
// private String name; // @Column(nullable=false, length=45)
// private String resume;  // @Column(length=255)
// private int grupo = 1;
// private int orderdeploy = 0;
// private boolean status = true; // @Column(nullable=false)





export const CARDS: Card[] = [
    {
        id: 1,
        name: "Perfil",
        resume: "Experiencia soft, formacion hard",
        grupo: 1,
        orderdeploy: 0,
        status: false,
        MyClass: "",
    },
    {
        id: 2,
        name: "Objetivo",
        resume: "Tras proyectos ambiciosos con gente positiva",
        grupo: 1,
        orderdeploy: 0,
        status: false,
        MyClass: "",

    },
    {
        id: 3,
        name: "Trayectoria",
        resume: "ex Directivo, desarrollador, capacitador",
        grupo: 1,
        orderdeploy: 0,
        status: false,
        MyClass: "",
    },
    {
        id: 4,
        name: "Formación",
        resume: "Analista de Sistemas, MBA, Full-Stack",
        grupo: 1,
        orderdeploy: 0,
        status: false,
        MyClass: "",
    },
    {
        id: 5,
        name: "Habilidades tecnicas",
        resume: "Python, Django, Java, Angular, CSS3, HTML",
        grupo: 2,
        orderdeploy: 0,
        status: false,
        MyClass: "",
    },
    {
        id: 6,
        name: "Habilidades personales",
        resume: "Metodico y gran atención a los detalles",
        grupo: 2,
        orderdeploy: 0,
        status: false,
        MyClass: "",
    },
    {
        id: 7,
        name: "Proyectos",
        resume: "",
        grupo: 2,
        orderdeploy: 0,
        status: false,
        MyClass: "",
    },
    {
        id: 8,
        name: "Intereses",
        resume: "",
        grupo: 2,
        orderdeploy: 0,
        status: false,
        MyClass: "",
    }
]

export const PORTFOLIOINIT: PortfolioInit =
{
    id: 1,
    theme: "Dark",
    status: true,
    userId: 1,
}


// OBJETOS UTILIZADOS EN EL INICIO DE LAS PRUEBAS
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
    name: "Walterio",
    lastname: "Mock",
    foto: "../assets/images/ico.svg",
    location: "Bernal, Bs.As. Argentina.",
    profession: ["Full Stack Developer", "PYTHON - JAVA"],
    profile: ["Mock cargos de RRHH y disfruté mejorar procesos, generar tableros de control para la toma de decisiones, y hacer de 'una especie de analista funcional' para servir de enlace entre áreas de negocio y de tecnología. Ciertamente era un Analista Universitario de Sistemas en un área de recursos humanos.", "Luego de 24 años trabajando en la universidad, ahora he vuelto a mi esencia: 'creatividad, innovación, sistemas y tecnología'.", "En resumen, además de contar con criterio empresarial tengo conocimientos y experiencia para sumar valor a cualquier proyecto, y quienes me conocen destacarán mi compromiso para alcanzar objetivos, mi lealtad, integridad y disciplina."],
    objetive: ["Mock atraen los desafíos y aventuras en donde pueda seguir ayudando, creando, innovando, mejorando ...", "Podés contactarme si tenés alguna idea o propuesta y será un plus si es divertida."],
    since: "1948",
    experiencia_resume: "Mock SOY CLARAMENTE EL INDICADO",
}


export const FORMACION: Formacion[] = [
    {
        id: 1,
        start_date: "3/1990",
        end_date: "12/1996",
        institution: "UCALP",
        degree: "Mock Analista de sistemas",
    },
    {
        id: 2,
        start_date: "3/1990",
        end_date: "12/1996",
        institution: "EDUCACION IT",
        degree: "Full Stack Python",
    }
]


export const WORKEXPERIENCE: WorkExperience[] = [
    {
        id: 1,
        start_date: "09-1993",
        end_date: "02-2018",
        organization: "Mock ITBA",
        position: "Director"
    },
    {
        id: 2,
        start_date: "09-1990",
        end_date: "12-1993",
        organization: "freelance",
        position: "Programador"
    },
]

export const INTERESES: Intereses[] = [
    {
        id: 1,
        name: "Mock Paddel",
    },
    {
        id: 2,
        name: "Viajar",
    }
]
