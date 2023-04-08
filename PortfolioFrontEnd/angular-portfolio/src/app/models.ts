// ### PENDIENTE VERIFICAR EL USO DE
// ESTAS INTERFACES ANTES DE ELIMINAR

import { IconName } from "@fortawesome/fontawesome-svg-core";

export interface User {
    id: number,
    username: string,
    password: string,
    admin: boolean,
}
export interface Cards {
    id: number,
    name: string,
    status: boolean,
    group: number,
    data: any,
    resume: string,
    modelTemplate: string,
    userId: number,
}
export interface PortfolioInit {
    id: number,
    userId: number,
    theme: string,
    status: boolean,
}
export interface Data {
    id: number,
    name: string,
    lastname: string,
    foto: string,
    location: string,
    profession: string[],
    profile: string[],
    objetive: string[],
    since: string,
    experiencia_resume: string
}
export interface WorkExperience {
    id: number,
    start_date: string,
    end_date: string,
    organization: string,
    position: string,
}
export interface Formacion {
    id: number,
    start_date: string,
    end_date: string,
    institution: string,
    degree: string,
}
export interface Intereses {
    id: number,
    name: string,
}
// Fin interfaces que tiene importadas mockdata


// #####  clone BACKEND model ######
class Base {
    get MyClass() {
        return (this.constructor.name).toLowerCase();
    }
}
export class Card extends Base {
    id: number;
    name: string;
    resume: string;
    grupo: number;
    orderdeploy: number;
    status: boolean;

    constructor() {
        super();
    }
}
export class Degree extends Base {
    id: number;
    name: string;
    person: number;

    constructor() {
        super();
        this.id = 0;
        this.name = "";
        this.person = 0;

    }
}
export class DisplayData extends Base {
    id: number;
    name: boolean;
    lastName: boolean;
    photo: boolean;
    location: boolean;
    profession: boolean;
    since: boolean;
    theme: String;

    constructor() {
        super();
        this.id = 1;
        this.name = true;
        this.lastName = true;
        this.photo = true;
        this.location = true;
        this.profession = true;
        this.since = true;
        this.theme = "Flip"
    }
}


export class HardSkill extends Base {
    id: number;
    name: string;
    assessment: number;
    orderdeploy: number;
    person: number


    constructor() {
        super();
        this.id = 0;
        this.name = "";
        this.assessment = 0;
        this.orderdeploy = 0;
        this.person = 0;
    }

}

export class Interest extends Base {
    id: number;
    name: string;
    orderdeploy: number;
    person: number;

    constructor() {
        super();
        this.id = 0;
        this.name = "";
        this.orderdeploy = 0;
        this.person = 0;
    }
}
export class LaboralCareer extends Base {
    id: number;
    resume: string;
    startDate: Date;
    endDate: Date;
    orderdeploy: number;
    status: boolean;
    organization: Organization;
    roleposition: RolePosition;
    person: number;

    constructor() {
        super(),
            this.id = 0,
            this.resume = "",
            this.startDate = new Date(),
            this.endDate = new Date(),
            this.orderdeploy = 0,
            this.status = true,
            this.organization = new Organization(),
            this.roleposition = new Degree(),
            this.person = 1
    }

}
export class Organization extends Base {
    id: number;
    name: string;
    resume: string;
    url: string;
    person: number
    constructor() {
        super(),
            this.id = 0,
            this.name = "",
            this.resume = "",
            this.url = "",
            this.person = 0
    }

}
export class Person extends Base {
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
    pathBgImage: string;
    urlLocation: string;
    displaydata: DisplayData

    constructor(id:number, name:string, lastName:string, pathFoto:string,
        location:string, profession:string, profile:string, objetive:string,
        since:Date, email:string, pathBgImage:string, urlLocation:string, 
        displayData:DisplayData ) {
            super();
            this.id = id ? id : 0;
            this.name = name ? name : "";
            this.lastName = lastName ? lastName : "";
            this.pathFoto = pathFoto ? pathFoto : "";
            this.location = location ? location : "";
            this.profession = profession ? profession : "";
            this.profile = profile ? profile : "";
            this.objetive = objetive ? objetive : "";
            this.since = since ? since : new Date();
            this.email = email ? email : "";
            this.pathBgImage = pathBgImage ? pathBgImage : "";
            this.urlLocation = urlLocation ? urlLocation : "";
            this.displaydata = new DisplayData()
        }


}
export class Phone extends Base {
    id: number;
    description: string;
    number: string;
    orderdeploy: number;

    constructor() {
        super(),
            this.id = 0,
            this.description = "",
            this.number = "",
            this.orderdeploy = 0
    }
}
export class Project extends Base {
    id: number;
    name: string;
    resume: string;
    orderdeploy: number;
    since: Date;
    url: string;
    person: number

    constructor() {
        super(),
            this.id = 0,
            this.resume = "",
            this.since = new Date(),
            this.url = "",
            this.orderdeploy = 0
    }
}
export class ProjectMedia extends Base {
    id: number;
    filePath: string;
    upLoadDate: Date;
    orderdeploy: number;
    project: Project;

    constructor() {
        super(),
            this.id = 0,
            this.filePath = "",
            this.upLoadDate = new Date(),
            this.orderdeploy = 0,
            this.project = new Project()
    }
}
export class RolePosition extends Base {
    id: number;
    name: string;
    person: number

    constructor() {
        super(),
            this.id = 0,
            this.name = "",
            this.person = 0
    }
}
export class SocialNetwork extends Base {
    id: number;
    name: string;
    iconname: IconName;
    url: string;
    orderdeploy: number;
    person: number;

    constructor() {
        super()
    }
}
export class SoftSkill extends Base {
    id: number;
    name: string;
    assessment: number;
    orderdeploy: number;
    person: number;

    constructor() {
        super(),
            this.id = 0,
            this.name = "",
            this.assessment = 0,
            this.orderdeploy = 0,
            this.person = 0
    }
}
export class Studie extends Base {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    orderdeploy: number;
    status: boolean;
    organization: Organization;
    degree: Degree;
    person: number;


    constructor() {
        super();
        this.id = 0;
        this.name = "";
        this.startDate = new Date();
        this.endDate = new Date();
        this.orderdeploy = 0;
        this.status = true;
        this.organization = new Organization();
        this.degree = new Degree();
        this.person = 1;
    }
};

// ### END BACKEND clone model ####
// ######## ENTRY DOOR  ###########

export class FullPersonDTO {
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
    pathBgImage: string;
    urlLocation: string;
    // username: string;
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

    constructor() {}
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
    constructor(nombreUsuario: string, password: string) {
        this.nombreUsuario = nombreUsuario;
        this.password = password;
    }
}
export class Rol {
    id: number;
    rolNombre: string;

    constructor() {
        [
            this.id = 1,
            this.rolNombre = "ROLE_USER"
        ];
        [
            this.id = 1,
            this.rolNombre = "ROLE_ADMIN"
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

// ####### utilityies Class  ##########
export class Mensaje {
    type: string;  
    message: string[];
    timer:number;
    url: string;

    constructor(type:string, message: string[], timer?:number, url?:string) {
        // valid values: error, ok, info
        if (["info", "error", "ok"].includes(type) ) {
            this.type = type;
            this.message = message;
            this.timer = timer ? timer : 0;
            this.url = url ? url : '';
        } else {
            console.log("ERROR en parametros del mensaje del alerta");
        }
    };

}
// ### Fin utilityies Class  ##########