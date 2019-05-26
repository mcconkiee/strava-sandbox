import * as constants from '../constants/redux';
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

export function ActivitiesListGet(page:number): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST,
        payload: page
    }
}

export function ActivitiesListGetSuccess(activities:object[]): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST_SUCCESS,
        payload: activities 
    }
}

