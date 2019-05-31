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

