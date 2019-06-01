import { AUTHENTICATE_DOG, AUTHENTICATE_DOG_SUCCESS, ACTIVITY_CLONE, DOG_ERROR } from 'src/constants/redux';
import { ApplicationAction } from '.';

export interface DogError {
    type: DOG_ERROR;
    payload: any;
}

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

export function CloneActivityToDog(activity:object): ApplicationAction {
    return {
        type: ACTIVITY_CLONE,
        payload: activity
    }
}
export function DogsError(error:Error): DogError {
    return {
        type: DOG_ERROR,
        payload: error
    }
}
