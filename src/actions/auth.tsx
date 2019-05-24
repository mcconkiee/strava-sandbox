import * as constants from '../constants';

export interface Authenticate {
    type: constants.AUTHENTICATE;
}

export interface AuthenticateSuccess {
    type: constants.AUTHENTICATE_SUCCESS;
    payload: any;
}

export function Authenticate(): Authenticate {
    return {
        type: constants.AUTHENTICATE
    }
}

export function AuthenticateSuccess(userName:string): AuthenticateSuccess {
    return {
        type: constants.AUTHENTICATE_SUCCESS,
        payload: userName
    }
}

export default {
    auth:Authenticate,
    authSuccess:AuthenticateSuccess
}
