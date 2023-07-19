import {AbstractControl, ValidationErrors} from "@angular/forms";

export class CustomValidators {
  static noSpaces(control: AbstractControl): ValidationErrors | null {
    if (/\s/.test(control.value)) {
      return {noSpaces: true}
    }
    return null;
  }

  static checkExistEmail(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(control.value);
        return resolve({checkExistEmail: true})
      })
    })
  }
}
