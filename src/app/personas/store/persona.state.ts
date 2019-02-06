import { Persona } from '../models/persona';
import { Pago } from '../models/pago';

export interface IPersonaState {
    personas: Persona[];
    selectedPersona: Persona;
    pagoCreated: boolean;
    selectedPagoId: number;
}

export const initialPersonaState: IPersonaState = {
    personas: null,
    selectedPersona: null,
    pagoCreated: false,
    selectedPagoId: null
};