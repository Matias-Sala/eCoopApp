import { IPersonaState, initialPersonaState } from './persona.state';
import { PersonaActions, EPersonaActions } from './persona.actions';


export function personaReducer(state: IPersonaState = initialPersonaState, action: PersonaActions) {
    switch (action.type) {
        case EPersonaActions.GetPersonasSuccess: {
            return {
                ...state,
                personas: action.payload,
                reloadPersonas: false
            };
        }
        case EPersonaActions.GetPersonaSuccess: {

            const index = state.personas.findIndex(p => p.id === action.payload.persona.id);
            const persona = state.personas[index];
            const personaUpdated = {
                ...persona,
                ...action.payload.persona
            };
            const personas = [...state.personas];
            personas[index] = personaUpdated;

            return {
                ...state,
                personas: personas,
                selectedPersona: personas[index],
                reloadPersona: false
            };
        }
        case EPersonaActions.GetPagosRealizadosSuccess: {
            console.log(action.payload.pagos);

            return {
                ...state,
                pagosRealizados: action.payload.pagos
            };
        }
        case EPersonaActions.PostPadreSuccess: {
            return {
                ...state,
                reloadPersonas: true,
                effectError: null
            };
        }
        case EPersonaActions.PutPadreSuccess: {
            const index = state.personas.findIndex(p => p.id === action.payload.padre.id);
            const padre = state.personas[index];
            const padreUpdated = {
                ...padre,
                ...action.payload.padre
            };
            const personas = [...state.personas];
            personas[index] = padreUpdated;

            return {
                ...state,
                personas: personas,
                selectedPersona: personas[index]
            };
        }
        case EPersonaActions.PostPagoSuccess: {
            return {
                ...state,
                reloadPersona: true,
                effectError: null
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
