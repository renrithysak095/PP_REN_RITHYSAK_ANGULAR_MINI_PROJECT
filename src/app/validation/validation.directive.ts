import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appValidation]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidationDirective),
      multi: true,
    },
  ],
})
export class ValidationDirective implements Validator {
  @Input('appValidation') regexPattern!: string;

  constructor() { }

  static validate(regexPattern: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (value && !new RegExp(regexPattern).test(value)) {
        return { 'regexNotMatches': true };
      }

      return null;
    };
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.regexPattern) {
      return ValidationDirective.validate(this.regexPattern)(control);
    }
    return null;
  }

  
}
