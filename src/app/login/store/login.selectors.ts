import { IAppState } from 'src/app/store/app.state';
import { createSelector } from '@ngrx/store';
import { ILoginState } from './login.state';

export const selectLogin = (state: IAppState) => state.login;

export const selectIsAuth = createSelector(
        selectLogin,
        (state: ILoginState) => state.authenticated
);
