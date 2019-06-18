import { ApplicationAction } from '../actions';
import { AuthState } from '../../types/index';
import { AUTHENTICATE_ERROR, AUTHENTICATE_SUCCESS, AUTHENTICATE_TOKEN_SUCCESS, AUTHENTICATE_REFRESH_ERROR, DEAUTHENTICATE_SUCCESS, AUTHENTICATE_REFRESHTOKEN, AUTHENTICATE } from '../../constants/redux';

const initialState: AuthState = {
  refreshing: false
}
export function auth(state: AuthState = initialState, action: ApplicationAction): AuthState {
  state.error = undefined;
  switch (action.type) {
    case AUTHENTICATE:
      return {...state, refreshing:true}
    case AUTHENTICATE_TOKEN_SUCCESS:
      return { ...state, accessToken: action.payload, refreshing: false };
    case AUTHENTICATE_SUCCESS:
      return { ...state, userData: action.payload, refreshing: false };
    case AUTHENTICATE_REFRESH_ERROR:
      return { ...state, error: action.payload, refreshing: false }
    case AUTHENTICATE_REFRESHTOKEN:
      return { ...state, refreshing: true }
    case DEAUTHENTICATE_SUCCESS:
      return initialState;
    case AUTHENTICATE_ERROR:
      return { ...state, error: action.payload, refreshing: false };

  }
  return state;
}
