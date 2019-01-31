import { Concepto } from '../models/concepto';

export interface IConceptoState {
    conceptos: Concepto[];
    selectedConcepto: Concepto;
}

export const initialConceptoState: IConceptoState = {
    conceptos: null,
    selectedConcepto: null
};
