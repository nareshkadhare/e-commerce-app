import { AbstractControl, ValidatorFn } from "@angular/forms";

export function EmptyFieldValidator(control:AbstractControl): {[key:string] : any}  |  null  {
        
    const isEmpty = (control.value && control.value.trim() === "");
    return isEmpty ? { 'isEmpty' : true } : null;
}