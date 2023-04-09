import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { formatDate } from '@angular/common';

// Angular Custom Form Validators
// https://blog.angular-university.io/angular-custom-validators/

// Validacion sin usar, expresiones regulares combinadas para refuerzo de password.
export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasLowerCase = /[a-z]+/.test(value);

    const hasNumeric = /[0-9]+/.test(value);

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? { passwordStrength: true } : null;
  }

}

// Validacion de url: protocolo, dominio y su TLD mas directorios, anclas y parámetros
// https://elcssar.com/html5/input-type-url-regex-pattern

// PENDIENTE No funciona como se espera, revisar y profundizar.
export function createUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    
    if (!value) {
      return null;
    }

    // // Partes de la expresion regular
    // nameAndTLD = /https?:\/\/([a-zA-Z0-9]([^ @&%$\\\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.])+[a-zA-Z0-9]{2,4}([\.][a-zA-Z]{2})?/;
    // anchors = /\/?( (?<=\/) ([^ @&$#\\\/()+=?¿!,:;’&quot;^´*%|]|\d)+[\/]?)* (#(?<=#)[^ @&$#\\\/()+=?¿!,:;’&quot;^´*%|]*)?/;
    // parameters = /(\?(?<=\?)([^ @&$#\\\/()+=?¿!,:;’&quot;^´*|]+[=][^ @&$#\\\/()+=?¿!,:;’&quot;^´*|]+(&(?<=&)[^ @&$#\\\/()+=?¿!,:;’&quot;^´*|]+[=][^ @&$#\\\/()+=?¿!,:;’&quot;^´*|]+)* ))?/;


    const urlValid = /https?:\/\/([a-zA-Z0-9]([^ @&%$\\\/()=?¿!.,:;]|\d)*[a-zA-Z0-9][\.])+[a-zA-Z]{2,4}([\.][a-zA-Z]{2})?\/?((?<=\/)(([^ @&$#\\\/()+=?¿!,:;'&quot;^´*%|]|\d)+[\/]?)*(#(?<=#)[^ @&$#\\\/()+=?¿!,:;'&quot;^´*%|]*)?(\?(?<=\?)([^ @&$#\\\/()+=?¿!,:;'&quot;^´*|]+[=][^ @&$#\\\/()+=?¿!,:;'&quot;^´*|]+(&(?<=&)[^ @&$#\\\/()+=?¿!,:;'&quot;^´*|]+[=][^ @&$#\\\/()+=?¿!,:;'&quot;^´*|]+)*))?)?/.test(value);

    console.log("url valida", urlValid);
    
    return !urlValid ? { urlValid: true } : null;
  }

}

// Validacion de que la fecha de inicio sea superior a la fecha de nacimiento
export function createGreaterThanBirthValidator(pareto: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = new Date(control.value);
    const base = new Date(pareto);

    if (!value) {
      return null;
    }

    const dateValid = value >= base;

    return !dateValid ? { mayorDate: true } : null;

  }
}


export function createRangeValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {

    const start = new Date(form.get("startDate")?.value);

    const end = new Date(form.get("endDate")?.value);

    // El valor de la fecha de finalizacion no es requerido
    if (end.getTime()) {

      const isRangeValid = (end >= start);

      return isRangeValid ? null : { dateRange: true };
    }

    return null;
  }
}
