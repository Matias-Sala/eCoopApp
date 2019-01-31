import { Action } from '@ngrx/store';
import { User } from '../models/user';


export enum ELoginActions {
    SignIn = '[Login] Sign In',
    SignInSuccess = '[Login] Sign In Success',
    ErrorOccurred = '[Persona] Erro Occurred'
}

export class SignIn implements Action {
    public readonly type = ELoginActions.SignIn;
    constructor(public payload:  {username: string, password: string}) {}
}

export class SignInSuccess implements Action {
    public readonly type = ELoginActions.SignInSuccess;
    constructor(public payload: string) {}
}

export class ErrorOccurred implements Action {
    public readonly type = ELoginActions.ErrorOccurred;
    constructor(public payload: String) {}
}

export type LoginActions = SignIn | SignInSuccess | ErrorOccurred;
