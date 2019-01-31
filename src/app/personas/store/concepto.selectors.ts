import { IAppState } from 'src/app/store/app.state';
import { createSelector } from '@ngrx/store';
import { IConceptoState } from './concepto.state';

export const selectConcepto = (state: IAppState) => state.conceptos;

export const selectConceptoList = createSelector (
    selectConcepto,
    (state: IConceptoState) => state.conceptos
);
