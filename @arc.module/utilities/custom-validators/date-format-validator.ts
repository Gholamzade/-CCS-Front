import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PATTERN_DATE, PATTERN_DATE_TIME } from "@arc.module/constants/date-time-patterns";


export function DateFormatValidator(locale: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === null || control.value === '')
      return null;
    let input = (typeof control.value !== "string") ? control.value?.toString() : control.value;
    input = input?.replace(/\s\s+/g, ' ');

    let isValid = false;
    let patterns: RegExp[] = [
      PATTERN_DATE_TIME,
      PATTERN_DATE
    ]

    if (input && (typeof input === "string")) {
      input = input?.replace(/\//g, "-");
      isValid = patterns.some(pattern => pattern.test(input))
    }
    if (isValid) {

      return null;
    }
    return {
      patterns: {
        valid: false
      }
    }
  };
}

