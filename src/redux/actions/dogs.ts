import {
    ACTIVITY_CLONE,
    ADD_DOG,
    ADD_DOG_SUCCESS,
    AUTHENTICATE_DOG,
    AUTHENTICATE_DOG_SUCCESS,
    AUTHENTICATE_DOG_TOKEN_SUCCESS,
    DOG_ERROR,
    DOG_GET,
    DOG_GET_SUCCESS,
    DOGS_GET_ALL,
    DOGS_GET_ALL_SUCCESS,
    REMOVE_DOG,
    REMOVE_DOG_SUCCESS,
} from 'src/constants/redux';
import Dog from 'src/models/Dog';

import { ApplicationAction } from '.';

export interface DogError {
    type: DOG_ERROR;
    payload: any;
}

export function AddDog(dog: Dog): ApplicationAction {
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

export function RemoveDog(dog: Dog): ApplicationAction {
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
export function GetDog(path: string): ApplicationAction {
    return {
        type: DOG_GET,
        payload: path
    }
}
export function GetDogSuccess(dog: Dog): ApplicationAction {
    return {
        type: DOG_GET_SUCCESS,
        payload: dog
    }
}
export function GetDogs(): ApplicationAction {
    return {
        type: DOGS_GET_ALL,
        payload: null
    }
}
export function GetDogsSuccess(dogs: object[]): ApplicationAction {
    return {
        type: DOGS_GET_ALL_SUCCESS,
        payload: dogs
    }
}
export function DogsError(error: Error): DogError {
    return {
        type: DOG_ERROR,
        payload: error
    }
}
