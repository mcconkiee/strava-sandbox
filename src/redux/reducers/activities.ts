import { ApplicationAction } from '../actions';
import { ActivityState } from '../../types/index';
import { ACTIVITY_LIST_SUCCESS, ACTIVITY_ERROR, ACTIVITY_LIST, ACTIVITY_UPDATE_SUCCESS, ACTIVITY_QUEUE_TO_CLONE, ACTIVITY_QUEUE_TO_CLONE_SUCCESS, ACTIVITY_SELECTED, ACTIVITY_DESELECTED } from '../../constants/redux';


const initialState: ActivityState = {
  activities: [],
  page: 1,
  loading: false,
  queuedToClone: [],
}
export function activity(state: ActivityState = initialState, action: ApplicationAction): ActivityState {
  switch (action.type) {
    case ACTIVITY_LIST:
      return { ...state, page: action.payload, loading: true };
    case ACTIVITY_LIST_SUCCESS:
      return { ...state, activities: action.payload, loading: false };
    case ACTIVITY_ERROR:
      return { ...state, error: action.payload };
    case ACTIVITY_UPDATE_SUCCESS:
      return { ...state, updatedActivity: action.payload };
    case ACTIVITY_QUEUE_TO_CLONE:
      state.queuedToClone.push(action.payload)
      return { ...state };
    case ACTIVITY_SELECTED:
      return {...state,selectedActivity:action.payload}
      case ACTIVITY_DESELECTED:
      return {...state,selectedActivity:undefined}
    case ACTIVITY_QUEUE_TO_CLONE_SUCCESS:
      const filtrd = state.queuedToClone.filter( activity => activity['id'] !== action.payload.id)
      return { ...state, queuedToClone:filtrd };
  }
  return state;
}
