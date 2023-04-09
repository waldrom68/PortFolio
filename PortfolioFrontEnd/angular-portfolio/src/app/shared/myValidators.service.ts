import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { formatDate } from '@angular/common';


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


// Validacion de que la fecha de inicio sea superior a la fecha de nacimiento
export function dateValid(pareto:Date):  ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = new Date(control.value);
    const base = new Date(pareto);

    if (!value) {
        return null;
    }

    const dateValid = value > base;

    return !dateValid ? {mayorDate:true}: null;

  }
}


export function rangeValidation(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
      
      const start = new Date(form.get("startDate")?.value);

      const end  = new Date(form.get("endDate")?.value);

    // El valor de la fecha de finalizacion no es requerido
      if ( end.getTime() ) {

          const isRangeValid = (end  > start );

          return isRangeValid ? null : {dateRange:true};
      }
      
      return null;
  }
}
