import { initialLoginState } from './login.state';
import { ELoginActions, LoginActions } from './login.actions';

export function loginReducer(state = initialLoginState, action: LoginActions) {
    switch (action.type) {
        case ELoginActions.SignInSuccess: {
            return {
                ...state,
                token: action.payload,
                authenticated: true
            };
        }
        default: {
            return state;
        }
    }

}
