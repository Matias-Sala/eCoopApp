import { IAppState } from 'src/app/store/app.state';
import { createSelector, MemoizedSelector } from '@ngrx/store';
import { IPersonaState } from './persona.state';
import { Persona } from '../models/persona';

const selectPersonas = (state: IAppState) => state.personas;

export const selectPersonaList = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.personas
);

export const selectSelectedPersona = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.selectedPersona
);

export function selectPersona(id: number) {
    return createSelector(
        selectPersonas,
        (state: IPersonaState) => state.personas.find(p => p.id === id)
    );
}

export const selectReloadPersonas = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.reloadPersonas
);

export const selectReloadPersona = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.reloadPersona
);

export const selectErrors = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.effectError
);

