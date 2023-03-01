// ### PENDIENTE VERIFICAR EL USO DE
// ESTAS INTERFACES ANTES DE ELIMINAR

import { last } from "rxjs"

export interface User {
    id: number,
    username: string,
    password: string,
    admin: boolean,
}
export interface Cards {
    id: number,
    name: string,
    status:boolean,
    group: number,
    data: any,
    resume:string,
    modelTemplate: string,
    userId:number,
}
export interface PortfolioInit {
    id: number,
    userId:number,
    theme: string,
    status:boolean,
}
export interface Data {
    id:number,
    name:string,
    lastname:string,
    foto:string, 
    location:string,
    profession:string[], 
    profile:string[], 
    objetive:string[], 
    since:string,
    experiencia_resume:string
    }
export interface WorkExperience {
    id: number,
    start_date:string,
    end_date:string,
    organization:string,
    position:string,
}
export interface Formacion {
    id: number,
    start_date:string,
    end_date:string,
    institution:string,
    degree:string,
}
export interface Intereses {
    id: number,
    name:string,
}
// 
// export interface Users {
//     id:number,
//     name:string,
//     lastName:string,
//     pathFoto:string, 
//     location:string,
//     profession:string,
//     profile:string, 
//     objetive:string, 
//     since:string,
//     username:string,
//     password:string,
//     admin:boolean
//     }
// export interface Studies {
//     id: number,
//     start_date:string,
//     end_date:string,
//     institution:string,
//     degree:string,
//     userId:number,
// }
// export interface Interests {
//     id: number,
//     name:string,
//     userId:number
// }
// export interface Usuarios {
//     id:number,
//     name:string,
//     lastName:string,
// }

// ##### BACKEND clone model ######
export interface Card {
    id: number,
    name: string,
    resume:string,
    grupo: number,
    orderdeploy: number,
    status: boolean,
}
export interface Degree {
    id: number,
    name:string,
    person:number
}
export interface DisplayData {
    id: number,
    name: boolean,
    lastName: boolean,
    photo: boolean,
    location: boolean,
    profession: boolean,
    since: boolean,
    theme:String,
}
export interface HardSkill {
    id: number,
    name:string,
    assessment:number,
    orderdeploy: number,
    person:number,
}
export interface Interest {
    id: number,
    name:string,
    orderdeploy:number,
    person: number
}
export interface LaboralCareer {
    id: number,
    resume:string,
    startDate:Date,
    endDate:Date,
    orderdeploy:number,
    status:boolean,
    organization:Organization,
    roleposition:RolePosition,
    person:number
}
export interface Organization {
    id: number,
    name:string,
    resume:string,
    url:string,
    person:number
}
export class Person {
    id:number;
    name:string;
    lastName:string;
    pathFoto:string; 
    location:string;
    profession:string;
    profile:string; 
    objetive:string; 
    since:Date;
    email:string;
    displaydata: DisplayData

    constructor(    
        id:number,
        name:string,
        lastName:string,
        pathFoto:string, 
        location:string,
        profession:string,
        profile:string, 
        objetive:string, 
        since:Date,
        email:string, 
        displaydata: DisplayData ) {
            this.id = id;
            this.name = name;
            this.lastName = lastName;
            this.pathFoto = pathFoto;
            this.location = location;
            this.profession = profession;
            this.profile = profile;
            this.objetive = objetive;
            this.since = since;
            this.email = email;
            this.displaydata = displaydata;
        }
    
}
export interface Phone {
    id: number;
    description: string;
    number: string;
    orderdeploy: number;
}
export interface Project {
    id: number,
    name:string,
    resume:string,
    orderdeploy:number,
    since:Date,
    url:string,
    person:number
}
export interface ProjectMedia {
    id: number,
    filePath:string,
    upLoadDate:Date,
    orderdeploy:number,
    project:number,
}
export interface RolePosition {
    id: number,
    name:string,
    person:number
}
export interface SocialNetwork {
    id: number;
    name: string;
    pathIcon: string;
    url: string;
    orderdeploy: number;
    person: number;
}
export interface SoftSkill {
    id: number,
    name:string,
    assessment:number,
    orderdeploy:number,
    person:number,
}
export interface Studie {
    id: number,
    name: string,
    startDate:Date,
    endDate:Date,
    orderdeploy:number,
    status:boolean,
    organization:Organization,
    degree:Degree,
    person:number,
}
// ### END BACKEND clone model ####

// ######## ENTRY DOOR  ###########
export class FullPersonDTO{
    id: number;
    name: string;
    lastName: string;
    pathFoto: string;
    location: string;
    profession: string;
    profile: string;
    objetive: string;
    since: Date;
    email: string;
    username: string;
    displaydata: DisplayData;
    hardskill: HardSkill[];
    softskill: SoftSkill[];
    interest: Interest[];
    organization: Organization[];
    degree: Degree[];
    roleposition: RolePosition[];
    laboralCareer: LaboralCareer[];
    studie: Studie[];
    phone: Phone[];
    socialnetwork: SocialNetwork[];
    project: Project[];
}
// ###### END ENTRY DOOR  #########

// ##### models for security  #####
export class JwtDto {
    token: string;
    type: string;
    nombreUsuario: string;
    authorities: string[];
}
export class LoginUsuario {
    nombreUsuario: string;
    password: string;
    constructor(nombreUsuario: string, password:string) {
            this.nombreUsuario = nombreUsuario;
            this.password = password;
    }
}
export class Rol {
    id: number;
    rolNombre: string;

    constructor() {
        [
        this.id=1,
        this.rolNombre="ROLE_USER"
        ];
        [
        this.id=1,
        this.rolNombre="ROLE_ADMIN"
        ]
    }
}
export class Usuario {
    nombre: string;
    numbreUsuario: string;
    email: string;
    password: string;
    authorities: string[];
}
// ### END models for security  ###