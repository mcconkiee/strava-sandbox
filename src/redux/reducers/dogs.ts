import { DogState } from '../../types/index';
import { ApplicationAction } from 'src/redux/actions';
import { AuthenticateWithCode } from '../actions/auth';
import { AUTHENTICATE_DOG_SUCCESS } from 'src/constants/redux';

const initialState: DogState = {
    authenticateWithCode: AuthenticateWithCode
}

export function dogs(state: DogState = initialState, action: ApplicationAction): DogState {
    switch (action.type) {
        case AUTHENTICATE_DOG_SUCCESS:
            return { ...state, userData: action.payload }
        default:
            return state;
    }
    return state;
}
