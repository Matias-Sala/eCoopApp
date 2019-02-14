import { IAppState } from 'src/app/store/app.state';
import { createSelector } from '@ngrx/store';
import { IPersonaState } from './persona.state';

const selectPersonas = (state: IAppState) => state.personas;

export const selectPersonaList = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.personas
);

export const selectSelectedPersona = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.selectedPersona
);

export const selectPagoPostSuccess = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.pagoCreated
);

export const selectErrors = createSelector(
    selectPersonas,
    (state: IPersonaState) => state.effectError
);
