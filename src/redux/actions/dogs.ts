import { AUTHENTICATE_DOG, AUTHENTICATE_DOG_SUCCESS } from 'src/constants/redux';
import { ApplicationAction } from '.';

export function AuthenticateDogWithCode(code:string): ApplicationAction {
    return {
        type: AUTHENTICATE_DOG,
        payload: code
    }
}

export function AuthenticateDogSuccess(userData:object): ApplicationAction {
    return {
        type: AUTHENTICATE_DOG_SUCCESS,
        payload: userData
    }
}
