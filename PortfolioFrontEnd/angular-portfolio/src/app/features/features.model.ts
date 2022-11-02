import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export class datosExperiencia {
    constructor( 
        desde:string, 
        hasta:string,
        empresa:string,
        cargo:string,
        ) 
        {
        this.desde = desde;
        this.hasta = hasta;
        this.empresa = empresa;
        this.cargo = cargo;
        }
    desde:string = "";
    hasta:string = "";
    empresa:string = "";
    cargo:string = "";
}

export class datosPersonales {

    constructor( name:string,
        last_name:string, 
        foto:string, 
        location:string,
        profession:string, 
        perfil:string, 
        objetive:string, 
        since:string,
        experiencia:any,
        experiencia_resume:string
        ) 

    {
    this.name = name;
    this.last_name = last_name;
    this.foto = foto;
    this.location = location;
    this.profession = profession.split('\n');
    this.objetive = objetive.split('\n');
    this.perfil = perfil.split('\n');
    this.since = since;
    this.experiencia = experiencia;
    this.experiencia_resume = experiencia_resume;
    }

    name:string = "";
    last_name:string = ""; 
    foto:string = "";
    location:string = "";
    profession:string[] = [];
    perfil:string[] = [];
    perfil_resume:string = ""
    objetive:string[] = [];
    since:string = "";
    experiencia:string[] = [];
    experiencia_resume:string = ""

    visibility:boolean = true

}


export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}