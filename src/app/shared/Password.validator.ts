import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirmPassword').value;
  
  if ((password === '' && confirmPassword !== '')) {
    return { 'misMatch' : true };
  }

  if (password === '' || confirmPassword === '') {
    return null;
  }

  const isMismatched = password !== confirmPassword;

  return isMismatched ? { 'misMatch' : true } : null;
}
