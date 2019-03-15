import { Persona } from '../models/persona';
import { Pago } from '../models/pago';
import { PagoRealizado } from '../models/pago-realizado';

export interface IPersonaState {
    personas: Persona[];
    selectedPersona: Persona;
    reloadPersona: boolean;
    reloadPersonas: boolean;
    selectedPagoId: number;
    pagosRealizados: PagoRealizado[];
    effectError: string;
}

export const initialPersonaState: IPersonaState = {
    personas: null,
    selectedPersona: null,
    reloadPersona: false,
    reloadPersonas: false,
    selectedPagoId: null,
    pagosRealizados: null,
    effectError: null
};

