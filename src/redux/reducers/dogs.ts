import { DOG_ERROR, DOGS_GET_ALL, DOGS_GET_ALL_SUCCESS, ADD_DOG, ADD_DOG_SUCCESS, REMOVE_DOG, REMOVE_DOG_SUCCESS, DOG_GET, DOG_GET_SUCCESS } from 'src/constants/redux';
import { ApplicationAction } from 'src/redux/actions';

import { DogState } from '../../types';
import { AuthenticateWithCode } from '../actions/auth';
import { GetDogs } from '../actions/dogs';

const initialState: DogState = {
    authenticateWithCode: AuthenticateWithCode,
    getDogs: GetDogs,
    loading: false,
}

export function dogs(state: DogState = initialState, action: ApplicationAction): DogState {
    switch (action.type) {
        case DOGS_GET_ALL:
        case ADD_DOG:
        case DOG_GET:
        case REMOVE_DOG:
            return { ...state, loading: true }
        case ADD_DOG_SUCCESS:
        case REMOVE_DOG_SUCCESS:
            return { ...state, loading: false }
        case DOG_GET_SUCCESS:
            return { ...state, loading: false, currentDog: action.payload }
        case DOGS_GET_ALL_SUCCESS:
            return { ...state, dogs: action.payload, loading: false }
        case DOG_ERROR:
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
    return state;
}
