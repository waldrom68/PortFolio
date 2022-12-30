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

export interface User {
    id: number,
    username: string,
    password: string,
    admin: boolean,
}

// 
export interface Users {
    id:number,
    name:string,
    lastName:string,
    pathFoto:string, 
    location:string,
    profession:string,
    profile:string, 
    objetive:string, 
    since:string,
    username:string,
    password:string,
    admin:boolean
    }

    export interface Studies {
        id: number,
        start_date:string,
        end_date:string,
        institution:string,
        degree:string,
        userId:number,
    }

    export interface LaboralCareer {
        id: number,
        start_date:string,
        end_date:string,
        organization:string,
        position:string,
        userId:number,
    }
    
    export interface Interests {
        id: number,
        name:string,
        userId:number
    }
    export interface Projects {
        id: number,
        name:string,
        resume:string,
        userId:number
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
    export interface Usuario {
        id:number,
        name:string,
        lastName:string,
    }

// Modelos del backend
// PENDIENTE REEMPLAZAR USERID POR PERSON
export interface Person {
        id:number,
        name:string,
        lastName:string,
        pathFoto:string, 
        location:string,
        profession:string,
        profile:string, 
        objetive:string, 
        since:string,
        username:string,
        password:string,
        displaydata: DisplayData
        }

    export interface Interest {
        id: number,
        name:string,
        orderdeploy:number,
        userId: number
    }

    export interface SoftSkill {
        id: number,
        name:string,
        assessment:number,
        orderdeploy:number,
        userId:number,
    }
    export interface HardSkill {
        id: number,
        name:string,
        assessment:number,
        orderdeploy: number,
        userId:number,
    }

    export interface Project {
        id: number,
        name:string,
        resume:string,
        orderdeploy:number,
        since:number,
        url:string,
        userId:number
    }

