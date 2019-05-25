import { ApplicationAction } from '../actions';
import { AuthState } from '../types/index';
import {   AUTHENTICATE_ERROR, AUTHENTICATE_SUCCESS, AUTHENTICATE_TOKEN_SUCCESS } from '../constants/index';
import { AuthenticateWithCode } from 'src/actions/auth';
const initialState:AuthState = {
  authenticateWithCode:AuthenticateWithCode
}
export function auth(state: AuthState = initialState, action: ApplicationAction): AuthState {
  switch (action.type) {
    
    case AUTHENTICATE_TOKEN_SUCCESS:
      return { ...state, accessToken: action.payload};
    case AUTHENTICATE_SUCCESS:
      return { ...state, userData: action.payload  };
    case AUTHENTICATE_ERROR:
      return { ...state, error: action.payload  };    

  }
  return state;
}
