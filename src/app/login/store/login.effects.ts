import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { LoginService } from '../login.service';
import { ELoginActions, SignIn, SignInSuccess, ErrorOccurred } from './login.actions';
import { Router } from '@angular/router';


@Injectable()
export class LoginEffects {


    constructor(private _loginService: LoginService,
        private _action$: Actions,
        private router: Router) { }

    @Effect()
    getToken$ = this._action$.pipe(
        ofType(ELoginActions.SignIn),
        map((action: SignIn) => action.payload),
        switchMap(user => this._loginService.login(user.username, user.password)),
        map(token => {
            return new SignInSuccess(token);
        }),
        catchError(err => {
            return of(new ErrorOccurred(err));
        })
    );
}
