import { IPersonaState, initialPersonaState } from './persona.state';
import { PersonaActions, EPersonaActions } from './persona.actions';


export function personaReducer(state: IPersonaState = initialPersonaState, action: PersonaActions) {
    switch (action.type) {
        case EPersonaActions.GetPersonasSuccess: {
            return {
                ...state,
                personas: action.payload
            };
        }
        case EPersonaActions.GetPersonaSuccess: {

            const index = state.personas.findIndex(p => p.id === action.payload.persona.id);
            const persona = state.personas[index];
            const personaUpdated = {
                ...persona,
                ...action.payload.persona };
            const personas = [...state.personas];
            personas[index] = personaUpdated;

            return {
                ...state,
                personas: personas,
                selectedPersona: personas[index]
            };
        }
        case EPersonaActions.FindPersona: {
            const selectedPersona = { ...state.personas.find(p => p.id === action.payload.personaId) };
            return {
                ...state,
                selectedPersona: selectedPersona
            };
        }
        case EPersonaActions.PostPagoSuccess: {
            return {
                ...state,
                pagoCreated: true
            };
        }
        case EPersonaActions.PagoEnd: {
            return {
                ...state,
                pagoCreated: false
            };
        }
        case EPersonaActions.DeletePago: {
            return {
                ...state,
                selectedPagoId: action.payload.id
            };
        }
        case EPersonaActions.DeletePagoSuccess: {
            const persona = { ...state.selectedPersona };
            persona.pagos.splice(persona.pagos
                .findIndex(pago => pago.id === state.selectedPagoId), 1);
            return {
                ...state,
                selectedPersona: persona
            };
        }
        case EPersonaActions.EffectError: {
            return {
                ...state,
                effectError: action.payload.message
            };
        }
        default: {
            return state;
        }
    }
}
