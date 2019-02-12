import { Action } from '@ngrx/store';
import { Persona } from '../models/persona';
import { PagoPost, Pago } from '../models/pago';


export enum EPersonaActions {
    GetPersonas = '[Persona] Get Personas',
    GetPersonasSuccess = '[Persona] Get Personas Success',
    GetPersona = '[Persona] Get Persona',
    PostPago = '[Persona] Post Pago',
    PostPagoSuccess = '[Persona] Post Pago Success',
    DeletePago = '[Persona] Delete Pago',
    DeletePagoSuccess = '[Persona] Delete Pago Success',
    PagoEnd = '[Pago] Pago End',
    ErrorOccurred = '[Persona] Erro Occurred'
}

export class GetPersonas implements Action {
    public readonly type = EPersonaActions.GetPersonas;
}

export class GetPersonasSuccess implements Action {
    public readonly type = EPersonaActions.GetPersonasSuccess;
    constructor(public payload: Persona[]) {}
}

export class GetPersona implements Action {
    public readonly type = EPersonaActions.GetPersona;
    constructor(public payload: {personaId: number}) {}
}

export class PostPago implements Action {
    public readonly type = EPersonaActions.PostPago;
    constructor(public payload: {personaId: number, pago: PagoPost}) {}
}

export class PostPagoSuccess implements Action {
    public readonly type = EPersonaActions.PostPagoSuccess;
}

export class DeletePago implements Action {
    public readonly type = EPersonaActions.DeletePago;
    constructor(public payload: {pagoId: number}) {}
}

export class DeletePagoSuccess implements Action {
    public readonly type = EPersonaActions.DeletePagoSuccess;
    constructor(public payload: {pagoId: number}) {}
}

export class PagoEnd implements Action {
    public readonly type = EPersonaActions.PagoEnd;
}

export class ErrorOccurred implements Action {
    public readonly type = EPersonaActions.ErrorOccurred;
    constructor(public payload: String) {}
}

export type PersonaActions = GetPersonas |
                             GetPersonasSuccess |
                             GetPersona |
                             PostPago |
                             PostPagoSuccess |
                             DeletePago |
                             DeletePagoSuccess |
                             ErrorOccurred |
                             PagoEnd;
