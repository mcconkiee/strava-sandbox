import * as constants from '../../constants/redux';
import { ApplicationAction } from '.';

export interface Authenticate {
    type: constants.AUTHENTICATE;
}

export interface AuthenticateSuccess {
    type: constants.AUTHENTICATE_SUCCESS;
    payload: any;
}

export interface AuthenticateError {
    type: constants.AUTHENTICATE_ERROR;
    payload: any;
}

export function Authenticate(): Authenticate {
    return {
        type: constants.AUTHENTICATE
    }
}

export function DeAuthenticate(): ApplicationAction {
    return {
        type: constants.DEAUTHENTICATE,payload:null
    }
}

export function DeAuthenticateSuccess(): ApplicationAction {
    return {
        type: constants.DEAUTHENTICATE_SUCCESS,payload:null
    }
}

export function AuthenticateWithCode(code:string): ApplicationAction {
    return {
        type: constants.AUTHENTICATE_WITH_CODE,
        payload: code
    }
}

export function AuthTokenSuccess(token:string): ApplicationAction {
    return {
        type: constants.AUTHENTICATE_TOKEN_SUCCESS,
        payload: token
    }
}

export function AuthRefreshToken(): ApplicationAction {
    return {
        type: constants.AUTHENTICATE_REFRESHTOKEN,
        payload: null
    }
}

export function AuthRefreshSuccess(): ApplicationAction {
    return {
        type: constants.AUTHENTICATE_REFRESH_SUCCESS,
        payload: null
    }
}

export function AuthRefreshTokenError(error:Error): ApplicationAction {
    return {
        type: constants.AUTHENTICATE_REFRESH_ERROR,
        payload: error
    }
}

export function AuthRefreshTokenSuccess(tokenData:object): ApplicationAction {
    return {
        type: constants.AUTHENTICATE_REFRESHTOKEN_SUCCESS,
        payload: tokenData
    }
}

export function AuthenticateSuccess(userData:object): AuthenticateSuccess {
    return {
        type: constants.AUTHENTICATE_SUCCESS,
        payload: userData
    }
}

export function AuthenticateError(error:Error): AuthenticateError {
    return {
        type: constants.AUTHENTICATE_ERROR,
        payload: error
    }
}


