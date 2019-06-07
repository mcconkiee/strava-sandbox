import { ApplicationAction } from '../actions';
import { AuthState } from '../../types/index';
import { AUTHENTICATE_ERROR, AUTHENTICATE_SUCCESS, AUTHENTICATE_TOKEN_SUCCESS, AUTHENTICATE_REFRESH_ERROR, DEAUTHENTICATE_SUCCESS } from '../../constants/redux';

const initialState: AuthState = {
}
export function auth(state: AuthState = initialState, action: ApplicationAction): AuthState {
  state.error = undefined;
  switch (action.type) {

    case AUTHENTICATE_TOKEN_SUCCESS:
      return { ...state, accessToken: action.payload };
    case AUTHENTICATE_SUCCESS:
      return { ...state, userData: action.payload };
    case AUTHENTICATE_REFRESH_ERROR:
      return { ...state, error: action.payload }
    case DEAUTHENTICATE_SUCCESS:
      return initialState;
    case AUTHENTICATE_ERROR:
      return { ...state, error: action.payload };

  }
  return state;
}
