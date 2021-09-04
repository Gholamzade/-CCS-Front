import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export function OrPatternValidator(patterns: RegExp[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        let isValid = patterns.some(pattern => pattern.test(control.value))
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

