import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../store/app.state';
import { ILoginState } from '../login/store/login.state';
import { selectLogin } from '../login/store/login.selectors';
import { Router } from '@angular/router';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private _store: Store<IAppState>) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const loginState = this._store.pipe(select(selectLogin));
        let state: ILoginState;
        loginState.subscribe(s => state = s);

        if (state.authenticated) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${state.token}`
                }
            });
        }
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                window.alert(errorMessage);
                return throwError(errorMessage);
            })
        );
    }
}
