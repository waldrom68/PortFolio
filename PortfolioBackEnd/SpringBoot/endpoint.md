#######   API'S ENDPOINT   #######
url:port = localhost:8080

## PERSON Entity
### POST
OkOk-[url:port]\edit\person // edit and create (RequestBody)
Ok - [url:port]\del\person\{id}  (ResponseBody)

### GET
// PENDIENTE: mover la logica desde el controller al servicio
Ok - [url:port]\list\person\all // All with their related entities -Flat-
Ok - [url:port]\view\person\{id} // DTO

## CARD Entity
### POST
Ok - [url:port]\edit\card // allows up to 8 cards (RequestBody)

### GET
Ok - [url:port]\list\card\all // order by "grupo" y "orderdespliegue" 

## SOFTSKILL Entity
### POST
OkOk-[url:port]\edit\softskill // edit and create (RequestBody)
Ok - [url:port]\del\softskill\{id}

### GET
Ok - [url:port]\list\softskill\all // All softskill entity
Ok - [url:port]\list\softskill\{id} // DTO Only softskill entity for a person -Flat-

## HARDSKILL Entity
### POST
OkOk-[url:port]\edit\hardskill // edit and create (RequestBody)
Ok - [url:port]\del\hardskill\{id}

### GET
Ok - [url:port]\list\hardskill\all // All hardskill entity
Ok - [url:port]\list\hardskill\{id} // DTO Only hardskill entity for a person -Flat-

##  PROJECT Entity
### POST
OkOk-[url:port]\edit\project // edit and create (RequestBody)
Ok - [url:port]\del\project\{id}

### GET
Ok - [url:port]\list\project\all // All project entity
Ok - [url:port]\list\project\{id} // DTO Only hardskill entity for a person -Flat-

##  INTEREST Entity
### POST
OkOk- [url:port]\edit\interest // edit and create (RequestBody)
Ok - [url:port]\del\interest\{id}

### GET
Ok - [url:port]\list\interest\all // All interest entity
Ok - [url:port]\list\interest\{id} // DTO Only hardskill entity for a person -Flat-

## DEGREE Entity
### POST
OkOk-[url:port]\edit\degree // edit and create (RequestBody)
Ok - [url:port]\edit\degree\{id}

### GET
- [url:port]\list\degree\all // All degree entity
- [url:port]\list\degree\{id} // entity for a person -Flat-

##  ORGANIZATION Entity
### POST
OkOk-[url:port]\edit\organization // edit and create (RequestBody)
Ok - [url:port]\del\organization\{id}

### GET
Ok - [url:port]\list\organization\all // All degree entity
Ok - [url:port]\list\organization\{id} // Only hardskill entity for a person -Flat-


##  ROLEPOSITION Entity
### POST
OkOk- [url:port]\edit\roleposition
Ok - [url:port]\del\roleposition\{id}

### GET
Ok - [url:port]\list\roleposition\all


##  PHONE Entity
### POST
OkOk-[url:port]\edit\phone
Ok - [url:port]\del\phone\{id}

### GET
Ok - [url:port]\list\phone\all
Ok - [url:port]\list\phone\{id}


##  SOCIALNETWORK Entity
### POST
OkOk-[url:port]\edit\social
Ok - [url:port]\edit\social\{id}

### GET
Ok - [url:port]\list\social\all
Ok - [url:port]\lilst\social\{id}


## STUDIE Entity
### POST
OkOk-[url:port]\edit\studie
- [url:port]\del\studie\{id}
### GET
Ok - [url:port]\list\studie\all
Ok - [url:port]\list\studie\{id}



## LABORALCAREER Entity
### POST
OkOk-[url:port]\edit\laboralcareer
Ok - [url:port]\del\laboralcareer\{id}

### GET
Ok - [url:port]\list\laboralcareer\all
Ok - [url:port]\list\laboralcareer\{id}


##  Entity
### POST
- [url:port]
- [url:port]
### GET
- [url:port]
- [url:port]
- [url:port]

+54 9 11 2053-5704
#######   JSON DE INICIO   #######

localhost:8080\edit\person
{
    "id": 1,
    "name": "Walter",
    "lastName": "Romero",
    "pathFoto": "..\assets\images\ico.svg",
    "location": "Argentina, Bs.As.",
    "profession": "Full Stack Developer\nPYTHON - JAVA",
    "profile": "Ocupé cargos de RRHH y disfruté mejorar procesos, generar tableros de control para la toma de decisiones, y hacer de \"una especie de analista funcional\" para servir de enlace entre áreas de negocio y de tecnología. Ciertamente era un Analista Universitario de Sistemas en un área de recursos humanos.\n\nLuego de 24 años trabajando en la universidad, ahora he vuelto a mi esencia: \"creatividad, innovación, sistemas y tecnología\".\n\nEn resumen, además de contar con criterio empresarial tengo conocimientos y experiencia para sumar valor a cualquier proyecto, y quienes me conocen destacarán mi compromiso para alcanzar objetivos, mi lealtad, integridad y disciplina.",
    "objetive": "Me atraen los desafíos y aventuras en donde pueda seguir ayudando, creando, innovando, mejorando ...\nPodés contactarme si tenés alguna idea o propuesta y será un plus si es divertida.",
    "since": "1968",
    "email": "waldrom68@gmail.com",
    "username": "waldrom",
    "password": "sinclave"
}

{
    "id": 2,
    "name": "Persona",
    "lastName": "De Prueba",
    "pathFoto": "",
    "location": "Argentina, Bs.As.",
    "profession": "Programador Senior\nCOBOL",
    "profile": "",
    "objetive": "",
    "since": "1948",
    "email": "de-prueba@gmail.com",
    "username": "persona",
    "password": "olvidaclave"
}


localhost:8080\edit\card
{
    "name": "Perfil",
    "resume": "Lo que me interesa de la vida"
}

{
    "name": "Objetivo",
    "resume": "Lo que me interesa de la vida"
}

{
    "name": "Trayectoria",
    "resume": "Lo que me interesa de la vida"
}

{
    "name": "Formación",
    "resume": "Analista de Sistemas, MBA, Full-Stack"
}

{
    "name": "Habilidades técnicas",
    "resume": "Python, Django, JS, Java, Angular, SQL, CSS3, HTML"
}

{
    "name": "Habilidades personales",
    "resume": "Un profesional y excelente persona"
}

{
    "name": "Proyectos",
    "resume": "Poco por ahora"
}

{
    "name": "Intereses",
    "resume": "Lo que me interesa de la vida"
}


localhost:8080\edit\softskill
{
    "name": "Adaptación al CLIMA jeje",
    "assessment": 50,
    "person": 1
}

{
    "name": "Capacidad analítica",
    "assessment": 40,
    "person": 1
}

{
    "name": "Gestión del tiempo",
    "assessment": 40,
    "person": 1
}

{
    "name": "Inteligencia emocional y social",
    "assessment": 40,
    "person": 1
}

{
    "name": "Seguridad personal",
    "assessment": 30,
    "person": 1
}

{
    "name": "Trabajo en equipo",
    "assessment": 30,
    "person": 1
}

localhost:8080\edit\hardskill
{
    "name": "CSS",
    "assessment": 65,
    "person": 1
}

{
    "name": "Django",
    "assessment": 35,
    "person": 1
}

{
    "name": "HTML",
    "assessment": 70,
    "person": 1
}


{
    "name": "Javascript",
    "assessment": 60,
    "person": 1
}

{
    "name": "MySQL",
    "assessment": 60,
    "person": 1
}

{
    "name": "Python",
    "assessment": 80,
    "person": 1
}


localhost:8080\edit\project
{
    "id": 1,
    "name": "Guia audica para eventos",
    "resume": "Lenguajes\tecnologías: DjangoRest Framework, Python, Bootstrap, JS, HTML y CSS",
    "since": "2022",
    "url": "https:\\waldrom68.pythonanywhere.com",
    "orderdeploy": 0,
    "person": 1
}

{
    "id": 2,
    "name": "CV, static Web Page",
    "resume": "Lenguajes\tecnologías: HTML, CSS y JS",
    "since": "2021",
    "url": "https:\\waldrom68.github.io",
    "orderdeploy": 0,
    "person": 1
}


localhost:8080\edit\interest
{
    "id": 1,
    "name": "Padle",
    "orderdeploy":0,
    "person": 1
}

{
    "id": 2,
    "name": "Viajar",
    "orderdeploy":0,
    "person": 1
}

{
    "id": 3,
    "name": "culear",
    "orderdeploy":0,
    "person": 1
}

{
    "id": 4,
    "name": "Colaborar y asistir",
    "orderdeploy":0,
    "person": 1
}

{
    "id": 5,
    "name": "Restaurar muebles y objetos",
    "orderdeploy":0,
    "person": 1
}

{
    "id": 6,
    "name": "hacer milanesas a la napo",
    "orderdeploy":0,
    "person": 1
}



Studie

   {
      "id": 4,
      "start_date": "2022",
      "end_date": "..",
      "degree": "Programador Web full stack Java",
      "userId": 1
    },
    {
      "id": 3,
      "start_date": "2021",
      "end_date": "2022",
      "degree": "Python Web Developer",
      "userId": 1
    },
    {
      "id": 2,
      "start_date": "2007",
      "end_date": "2012",
      "degree": "Maestría en Dirección de Empresas",
      "userId": 1
    },
    {
      "id": 1,
      "start_date": "2000",
      "end_date": "1996",
      "degree": "Analista Universitario de Sistemas",
      "userId": 1
    }      

    {
      "id": 1,
      "start_date": "09-1993",
      "end_date": "02-2018",
      "userId": 1
    },
    {
      "id": 2,
      "start_date": "09-1990",
      "end_date": "12-1993",
      "userId": 1
    }


Degree
"level": "Grado",
"level": "Posgrado",
"level": "Especialización",

Organization
"organization": "Min. de Desarrollo Productivo y CESSI",
"organization": "EDUCACION IT",
"organization": "UP",
"organization": "UCALP",
"organization": "freelance",
"organization": "ITBA",


"roleposition": "Director - RRHH",
"roleposition": "Ejecutivo - RRHH",
"roleposition": "Analista Sr. - Administración",
"roleposition": "Programador Sr.",