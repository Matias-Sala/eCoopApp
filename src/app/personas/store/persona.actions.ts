import { Action } from '@ngrx/store';
import { Persona } from '../models/persona';
import { PagoPost, Pago } from '../models/pago';
import { Padre } from '../models/post/PadrePost';
import { PagoRealizado } from '../models/pago-realizado';


export enum EPersonaActions {
    GetPersonas = '[Persona] Get Personas',
    GetPersonasSuccess = '[Persona] Get Personas Success',
    GetPersona = '[Persona] Get Persona',
    GetPersonaSuccess = '[Persona] Get Persona Success',
    PostPadre = '[Persona] Post Padre',
    PostPadreSuccess = '[Persona] Post Padre Success',
    PutPadre = '[Persona] Put Padre',
    PutPadreSuccess = '[Persona] Put Padre Success',
    PostPersonaEnd = '[Persona] Post Persona End',
    DeleteFamiliar = '[Persona] Delete Familiar',
    DeleteFamiliarSuccess = '[Persona] Delete Familiar Success',
    PostPago = '[Persona] Post Pago',
    PostPagoSuccess = '[Persona] Post Pago Success',
    DeletePago = '[Persona] Delete Pago',
    DeletePagoSuccess = '[Persona] Delete Pago Success',
    GetPagosRealizados = '[Persona] Get Pagos Realizados',
    GetPagosRealizadosSuccess = '[Persona] Get Pagos Realizados Success',
    EffectError = '[Persona] Erro Occurred'
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

export class GetPersonaSuccess implements Action {
    public readonly type = EPersonaActions.GetPersonaSuccess;
    constructor(public payload: {persona: Persona}) {}
}

export class GetPagosRealizados implements Action {
    public readonly type = EPersonaActions.GetPagosRealizados;
}

export class GetPagosRealizadosSuccess implements Action {
    public readonly type = EPersonaActions.GetPagosRealizadosSuccess;
    constructor(public payload: {pagos: PagoRealizado[]}) {}
}

export class PostPadre implements Action {
    public readonly type = EPersonaActions.PostPadre;
    constructor(public payload: {padre: Persona}) {}
}

export class PostPadreSuccess implements Action {
    public readonly type = EPersonaActions.PostPadreSuccess;
}

export class PutPadre implements Action {
    public readonly type = EPersonaActions.PutPadre;
    constructor(public payload: {padre: Persona}) {}
}

export class PutPadreSuccess implements Action {
    public readonly type = EPersonaActions.PutPadreSuccess;
    constructor(public payload: {padre: Persona}) {}
}

export class PostPersonaEnd implements Action {
    public readonly type = EPersonaActions.PostPersonaEnd;
}

export class PostPago implements Action {
    public readonly type = EPersonaActions.PostPago;
    constructor(public payload: {personaId: number, pago: PagoPost}) {}
}

export class PostPagoSuccess implements Action {
    public readonly type = EPersonaActions.PostPagoSuccess;
}

export class DeleteFamiliar implements Action {
    public readonly type = EPersonaActions.DeleteFamiliar;
    constructor(public payload: {id: number, familiarId: number}) {}
}

export class DeleteFamiliarSuccess implements Action {
    public readonly type = EPersonaActions.DeleteFamiliarSuccess;
    constructor(public payload: {id: number}) {}
}

export class DeletePago implements Action {
    public readonly type = EPersonaActions.DeletePago;
    constructor(public payload: {id: number, personaId: number}) {}
}

export class DeletePagoSuccess implements Action {
    public readonly type = EPersonaActions.DeletePagoSuccess;
    constructor(public payload: {id: number}) {}
}

export class EffectError implements Action {
    public readonly type = EPersonaActions.EffectError;
    constructor(public payload: {message: string}) {}
}

export type PersonaActions = GetPersonas |
                             GetPersonaSuccess |
                             GetPersonasSuccess |
                             GetPagosRealizados |
                             GetPagosRealizadosSuccess |
                             PostPadre |
                             PostPadreSuccess |
                             PutPadre |
                             PutPadreSuccess |
                             PostPersonaEnd |
                             PostPago |
                             PostPagoSuccess |
                             DeletePago |
                             DeletePagoSuccess |
                             EffectError;
