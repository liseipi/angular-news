import {Directive, Input} from '@angular/core';
import {Validator, AbstractControl, ValidationErrors, ValidatorFn, NG_VALIDATORS} from "@angular/forms";

export function isEmailValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = nameRe.test(control.value);
    return !pass ? {isEmail: {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appIsEmailValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: IsEmailValidatorDirective, multi: true}]
})
export class IsEmailValidatorDirective implements Validator {

  @Input('appIsEmailValidator') emailField = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.emailField ? isEmailValidator(new RegExp(this.emailField, 'i'))(control) : null;
  }

}
