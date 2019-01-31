import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from './app.state';
import { routerReducer } from '@ngrx/router-store';
import { personaReducer } from '../personas/store/persona.reducer';
import { conceptoReducer } from '../personas/store/concepto.reducers';
import { loginReducer } from '../login/store/login.reducers';

export const appReducer: ActionReducerMap<IAppState, any> = {
    router: routerReducer,
    login: loginReducer,
    personas: personaReducer,
    conceptos: conceptoReducer
};
