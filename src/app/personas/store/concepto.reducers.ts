import { IConceptoState } from './concepto.state';
import { ConceptoActions, EConceptoActions } from './concepto.actions';


export function conceptoReducer(state: IConceptoState, action: ConceptoActions) {
    switch (action.type) {
        case EConceptoActions.GetConceptosSuccess: {
            return {
                ...state,
                conceptos: action.payload
            };
        }
        case EConceptoActions.GetConcepto: {
            const selectedConcepto = {...state.conceptos[action.payload]};
            return {
                ...state,
                selectedConcepto: selectedConcepto
            };
        }
        default: {
            return state;
        }
    }
}
