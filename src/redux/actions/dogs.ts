import { AUTHENTICATE_DOG, AUTHENTICATE_DOG_SUCCESS, ACTIVITY_CLONE, DOG_ERROR, AUTHENTICATE_DOG_TOKEN_SUCCESS, DOGS_GET_ALL, DOGS_GET_ALL_SUCCESS } from 'src/constants/redux';
import { ApplicationAction } from '.';

export interface DogError {
    type: DOG_ERROR;
    payload: any;
}

export function AuthenticateDogWithCode(code: string): ApplicationAction {
    return {
        type: AUTHENTICATE_DOG,
        payload: code
    }
}


export function AuthenticateDogTokenSuccess(token: string): ApplicationAction {
    return {
        type: AUTHENTICATE_DOG_TOKEN_SUCCESS,
        payload: token
    }
}
export function AuthenticateDogSuccess(userData: object): ApplicationAction {
    return {
        type: AUTHENTICATE_DOG_SUCCESS,
        payload: userData
    }
}

export function CloneActivityToDog(activity: object): ApplicationAction {
    return {
        type: ACTIVITY_CLONE,
        payload: activity
    }
}
export function GetDogs(): ApplicationAction {
    return {
        type: DOGS_GET_ALL,
        payload:null
    }
}
export function GetDogsSuccess(dogs:object[]): ApplicationAction {
    return {
        type: DOGS_GET_ALL_SUCCESS,
        payload:dogs
    }
}
export function DogsError(error: Error): DogError {
    return {
        type: DOG_ERROR,
        payload: error
    }
}
