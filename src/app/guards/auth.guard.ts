import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginService } from '../login/login.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../store/app.state';
import { ILoginState } from '../login/store/login.state';
import { first, map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<IAppState>, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.pipe(
            select(s => s.login),
            first(),
            map((authState: ILoginState) => {
                if (authState.authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}
