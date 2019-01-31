import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { IAppState } from '../store/app.state';
import { ILoginState } from '../login/store/login.state';
import { selectLogin } from '../login/store/login.selectors';

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

        return next.handle(request);
    }
}
