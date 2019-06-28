import { DOG_ERROR, DOGS_GET_ALL, DOGS_GET_ALL_SUCCESS } from 'src/constants/redux';
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
            return { ...state, loading: true }
        case DOGS_GET_ALL_SUCCESS:
            return { ...state, dogs: action.payload, loading: false }
        case DOG_ERROR:
            return { ...state, error: action.payload, loading: false }
        default:
            return state;
    }
    return state;
}
