export interface Data {
    id:number,
    name:string,
    last_name:string,
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

export interface HardSkill {
    id: number,
    name:string,
    assessment:number,
}

export interface SoftSkill {
    id: number,
    name:string,
    assessment:number,
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
    last_name:string,
    foto:string, 
    location:string,
    profession:string,
    profile:string, 
    objetive:string, 
    since:string,
    experiencia_resume:string,
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
    
    export interface SoftSkill {
        id: number,
        name:string,
        assessment:number,
        userId:number,
    }
    
    export interface HardSkill {
        id: number,
        name:string,
        assessment:number,
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
        name: string,
        status:boolean,
        group: number,
        data: any,
        resume:string,
        modelTemplate: string,
        userId:number,
    }
    
    export interface PortfolioInit {
        userId:number,
        theme: string,
        status:boolean,
    }

    export interface DisplayPersonalData {
        name: boolean,
        last_name: boolean,
        foto: boolean,
        location: boolean,
        profession: boolean,
        since: boolean,
        userId:number,
        
    }