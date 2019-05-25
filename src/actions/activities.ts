import * as constants from '../constants';
import { ApplicationAction } from '.';

export interface ActivityError {
    type: constants.AUTHENTICATE_ERROR;
    payload: any;
}

export function ActivityError(error:Error): ActivityError {
    return {
        type: constants.AUTHENTICATE_ERROR,
        payload: error
    }
}

export function ActivitiesListGet(): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST,
        payload: null 
    }
}

export function ActivitiesListGetSucces(): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST_SUCCESS,
        payload: null 
    }
}

