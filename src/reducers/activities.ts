import { ApplicationAction } from '../actions';
import {  ActivityState } from '../types/index';
import {  ACTIVITY_LIST_SUCCESS, ACTIVITY_ERROR, ACTIVITY_LIST, ACTIVITY_UPDATE_SUCCESS } from '../constants/redux';

const initialState: ActivityState = {
  activities: [],
  page:1,  
  getActivitiesList:()=>{},  
}
export function activity(state: ActivityState = initialState, action: ApplicationAction): ActivityState {
  switch (action.type) {    
    case ACTIVITY_LIST:
      return { ...state, page: action.payload};
    case ACTIVITY_LIST_SUCCESS:
      return { ...state, activities: action.payload};
    case ACTIVITY_ERROR:
      return { ...state, error: action.payload  };    
    case ACTIVITY_UPDATE_SUCCESS:
      return { ...state, updatedActivity: action.payload  };    
  }
  return state;
}
