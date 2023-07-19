import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function matchPassword(equal: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password: string = control.parent?.get(equal)?.value;
    let repassword: string = control.value
    if (password && repassword && password != repassword) {
      return {confirm_password: true}
    }
    return null;
  };
}
