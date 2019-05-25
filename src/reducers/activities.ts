import { ApplicationAction } from '../actions';
import {  ActivityState } from '../types/index';
import {  ACTIVITY_LIST_SUCCESS, ACTIVITY_ERROR } from '../constants/redux';

const initialState: ActivityState = {
  activities: []
}
export function activity(state: ActivityState = initialState, action: ApplicationAction): ActivityState {
  switch (action.type) {    
    case ACTIVITY_LIST_SUCCESS:
      return { ...state, activities: action.payload};
    case ACTIVITY_ERROR:
      return { ...state, error: action.payload  };    
  }
  return state;
}
