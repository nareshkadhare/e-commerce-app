import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    
    const confirmPassword = control.value;
    const password = control.parent.value.password;
    if (confirmPassword === '' && control.untouched) {
      return false;
    }

    let result:any = password && confirmPassword && password !== confirmPassword;
          
    return  (result || result ==='') ? true : false;
  }
}
