import { Persona } from '../models/persona';
import { Pago } from '../models/pago';

export interface IPersonaState {
    personas: Persona[];
    selectedPersona: Persona;
    reloadPersona: boolean;
    reloadPersonas: boolean;
    selectedPagoId: number;
    effectError: string;
}

export const initialPersonaState: IPersonaState = {
    personas: null,
    selectedPersona: null,
    reloadPersona: false,
    reloadPersonas: false,
    selectedPagoId: null,
    effectError: null
};

