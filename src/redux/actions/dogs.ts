import { AUTHENTICATE_DOG, AUTHENTICATE_DOG_SUCCESS, ACTIVITY_CLONE, DOG_ERROR, AUTHENTICATE_DOG_TOKEN_SUCCESS, DOGS_GET_ALL, DOGS_GET_ALL_SUCCESS, ADD_DOG, ADD_DOG_SUCCESS, REMOVE_DOG, REMOVE_DOG_SUCCESS, DOG_GET, DOG_GET_SUCCESS } from 'src/constants/redux';
import { ApplicationAction } from '.';
import { DogObject } from 'src/types';

export interface DogError {
    type: DOG_ERROR;
    payload: any;
}

export function AddDog(dog: DogObject): ApplicationAction {
    return {
        type: ADD_DOG,
        payload: dog
    }
}

// TOOD - strict type params
export function AddDogSuccess(reponse: any): ApplicationAction {
    return {
        type: ADD_DOG_SUCCESS,
        payload: reponse
    }
}

export function RemoveDog(dog: DogObject): ApplicationAction {
    return {
        type: REMOVE_DOG,
        payload: dog
    }
}

// TOOD - strict type params
export function RemoveDogSuccess(reponse: any): ApplicationAction {
    return {
        type: REMOVE_DOG_SUCCESS,
        payload: reponse
    }
}



// TODO - remove this
export function AuthenticateDogWithCode(code: string): ApplicationAction {
    return {
        type: AUTHENTICATE_DOG,
        payload: code
    }
}

// TODO - remove this
export function AuthenticateDogTokenSuccess(token: string): ApplicationAction {
    return {
        type: AUTHENTICATE_DOG_TOKEN_SUCCESS,
        payload: token
    }
}
// TODO - remove this
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
export function GetDog(path:string): ApplicationAction {
    return {
        type: DOG_GET,
        payload:path
    }
}
export function GetDogSuccess(dog:DogObject): ApplicationAction {
    return {
        type: DOG_GET_SUCCESS,
        payload:dog
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
