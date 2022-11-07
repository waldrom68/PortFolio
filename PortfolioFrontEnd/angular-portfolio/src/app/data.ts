export class Data {
    id:number;
    name:string;
    last_name:string; 
    foto:string; 
    location:string;
    profession:string[]; 
    profile:string[]; 
    objetive:string[]; 
    since:string;
    experiencia_resume:string
    }

export interface WorkExperience {
    id: number;
    start_date:string;
    end_date:string;
    organization:string;
    position:string;
}

export interface Formacion {
    id: number;
    start_date:string;
    end_date:string;
    institution:string;
    degree:string;
}

export interface HardSkill {
    id: number;
    name:string;
    assessment:number;
}

export interface SoftSkill {
    id: number;
    name:string;
    assessment:number;
}

export interface Intereses {
    id: number;
    name:string;
}

export interface User {
    id: number;
    username: string;
    password: string;
    admin: boolean;
}

