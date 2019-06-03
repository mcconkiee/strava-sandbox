import { DogState } from '../../types/index';
import { ApplicationAction } from 'src/redux/actions';
import { AuthenticateWithCode } from '../actions/auth';
import { AUTHENTICATE_DOG_SUCCESS, AUTHENTICATE_DOG_TOKEN_SUCCESS, DOGS_GET_ALL_SUCCESS } from 'src/constants/redux';
import { GetDogs } from '../actions/dogs';

const initialState: DogState = {
    authenticateWithCode: AuthenticateWithCode,
    getDogs: GetDogs
}

export function dogs(state: DogState = initialState, action: ApplicationAction): DogState {
    switch (action.type) {
        case AUTHENTICATE_DOG_SUCCESS:
            return { ...state, userData: action.payload }
        case AUTHENTICATE_DOG_TOKEN_SUCCESS:
            return { ...state, accessToken: action.payload }
        case DOGS_GET_ALL_SUCCESS:
            return { ...state, dogs: action.payload }
        default:
            return state;
    }
    return state;
}
