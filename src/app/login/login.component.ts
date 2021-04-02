import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SimpleDialogComponent } from '../simple-dialog/simple-dialog.component';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent implements OnInit {
  loginUser = new User();

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog,public router:Router) {}

  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.pattern]],
    password: ['', Validators.required],
  });

  ngOnInit(): void {}

  login() {
    console.log(this.loginForm.value);

    if (
      this.email.value === 'admin@test.com' &&
      this.password.value === 'admin123'
    ) {
      this.router.navigate(['dashboard']);
    } else {
      this.dialog.open(SimpleDialogComponent, {
        data: {
          moduleName: 'Ecommerce - Login',
          message: 'Your email or password is mismatched.',
        },
      });
    }
  }
}
