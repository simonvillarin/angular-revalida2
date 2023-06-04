import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

//Validate Password (login)
export const hasNumberValidator = ():ValidatorFn => {
    return (control: AbstractControl) : ValidationErrors | null => {
        const hasNumber = /\d/.test(control.value);
        return hasNumber ? null : { hasNumber: true };
    }
}

export const hasLowercaseValidator = ():ValidatorFn => {
    return (control: AbstractControl) : ValidationErrors | null => {
        const hasLowercase = /[a-z]/.test(control.value);
    return hasLowercase ? null : { hasLowercase: true };
    }
}

export const hasUppercaseValidator = ():ValidatorFn => {
    return (control: AbstractControl) : ValidationErrors | null => {
        const hasUppercase = /[A-Z]/.test(control.value);
        return hasUppercase ? null : { hasUppercase: true };
    }
}

//Validate Mobile Number (forgot password)
export const mobileNumberIsValid = ():ValidatorFn => {
    return (control: AbstractControl) : ValidationErrors | null => {
        const isValid = /^(09|\+639)\d{9}$/.test(control.value);
        return isValid ? null : { mobileNoIsValid: true };
    }
}

export const mobileNumberContainLetters = ():ValidatorFn => {
    return (control: AbstractControl) : ValidationErrors | null => {
        const containsLetters = /[a-zA-Z]/.test(control.value);
    return containsLetters ? { mobileNoHasNoLetters: true } : null;
    }
}
