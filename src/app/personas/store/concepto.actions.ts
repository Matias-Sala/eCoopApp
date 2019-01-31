import { Action } from '@ngrx/store';
import { Concepto } from '../models/concepto';

export enum EConceptoActions {
    GetConceptos = '[Concepto] Get Conceptos',
    GetConceptosSuccess = '[Concepto] Get ConceptosSuccess',
    GetConcepto = '[Concepto] Get Concepto'
}

export class GetConceptos implements Action {
    public readonly type = EConceptoActions.GetConceptos;
}

export class GetConceptosSuccess implements Action {
    public readonly type = EConceptoActions.GetConceptosSuccess;
    constructor(public payload: Concepto[]) {}
}

export class GetConcepto implements Action {
    public readonly type = EConceptoActions.GetConcepto;
    constructor(public payload: number) {}
}

export type ConceptoActions = GetConceptos | GetConceptosSuccess | GetConcepto;
