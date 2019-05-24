import { Action } from '../actions/';
import { AuthState } from '../types/index';
import {  AUTHENTICATE } from '../constants/index';
const initialState:AuthState = {
  
}
export function auth(state: AuthState = initialState, action: Action): AuthState {
  switch (action.type) {
    case AUTHENTICATE:
      return { ...state, userName: state.userName  };    
  }
  return state;
}
