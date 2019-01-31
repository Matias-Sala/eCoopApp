import {RouterReducerState} from '@ngrx/router-store';
import { IPersonaState, initialPersonaState } from 'src/app/personas/store/persona.state';
import { IConceptoState, initialConceptoState } from '../personas/store/concepto.state';
import { ILoginState, initialLoginState } from '../login/store/login.state';

export interface IAppState {
    router?: RouterReducerState;
    login: ILoginState;
    personas: IPersonaState;
    conceptos: IConceptoState;
}

export const initialAppState: IAppState = {
    login: initialLoginState,
    personas: initialPersonaState,
    conceptos: initialConceptoState
};

export function getInitialState(): IAppState {
    return initialAppState;
}
