import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from '../models/user';
import { SignIn } from '../store/login.actions';
import { observable, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { selectIsAuth, selectLogin } from '../store/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  token = new Observable<string>();
  showprogressbar = false;
  hide = true;

  getErrorMessage() {
    const email = this.loginFormGroup.get('email');
    return email.hasError('required') ? 'Debe ingresar un dirección de email' :
        email.hasError('email') ? 'Email no válido.' :
            '';
  }

  constructor(private _store: Store<IAppState>, private router: Router) { }

  ngOnInit() {
    const isAut = this._store.pipe(select(selectIsAuth));

    isAut.subscribe(authOk => {
      if (authOk) {
        this.router.navigate(['padres']);
      }
    });

    this.loginFormGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    this.showprogressbar = true;
    const username = this.loginFormGroup.get('email').value;
    const password = this.loginFormGroup.get('password').value;
    this._store.dispatch(new SignIn({ username, password }));
  }
}
