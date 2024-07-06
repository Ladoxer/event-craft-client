import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static email(control: AbstractControl): ValidationErrors | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = emailRegex.test(control.value);
    return valid ? null : { email: true };
  }

  static minLength(minLength: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = control.value.length >= minLength;
      return valid ? null : { minlength: { requiredLength: minLength, actualLength: control.value.length } };
    };
  }
}