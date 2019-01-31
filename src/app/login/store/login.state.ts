import { User } from '../models/user';

export interface ILoginState {
    token: string;
    authenticated: boolean;
}

export const initialLoginState: ILoginState = {
    token: null,
    authenticated: false
};
