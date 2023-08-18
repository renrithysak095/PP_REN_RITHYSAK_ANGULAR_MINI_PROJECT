import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidationDirective,
      multi: true,
    },
  ],
})
export class PasswordValidationDirective implements Validator {
  
  static validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/;
    const isValid = regex.test(value);

    return isValid ? null : { invalidPassword: true };
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return PasswordValidationDirective.validate(control);
  }
}
