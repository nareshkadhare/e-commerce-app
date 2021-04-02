import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmptyFieldValidator } from '../shared/EmptyField.validator';
import { MyErrorStateMatcher } from '../shared/MyErrorStateMatcher';
import { PasswordValidator } from '../shared/Password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  matcher =  new MyErrorStateMatcher();

  constructor(private _formBuilder: FormBuilder) {}

  get fullname() {
    return this.registrationForm.get('fullname');
  }
  get mobile() {
    return this.registrationForm.get('mobile');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  } 

  registrationForm = this._formBuilder.group({
    fullname: ['', [Validators.required, EmptyFieldValidator]],
    mobile: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9]{10}'),
        EmptyFieldValidator,
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{1,63}$'),
        EmptyFieldValidator,
      ],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
  }, { validators : PasswordValidator });

  ngOnInit(): void {}

  register() {}
}
