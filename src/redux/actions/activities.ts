import * as constants from '../../constants/redux';
import { ApplicationAction } from '.';

export interface ActivityError {
    type: constants.ACTIVITY_ERROR;
    payload: any;
}

export function ActivityError(error:Error): ActivityError {
    return {
        type: constants.ACTIVITY_ERROR,
        payload: error
    }
}

export function ActivitiesListGet(page:number): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST,
        payload: page
    }
}

export function ActivityUpdate(data:object): ApplicationAction {
    return {
        type: constants.ACTIVITY_UPDATE,
        payload: data
    }
}

export function ActivityUpdateSucces(data:object): ApplicationAction {
    return {
        type: constants.ACTIVITY_UPDATE_SUCCESS,
        payload: data
    }
}

export function ActivityClone(data:object): ApplicationAction {
    return {
        type: constants.ACTIVITY_CLONE,
        payload: data
    }
}
export function ActivityRemove(activity:object): ApplicationAction {
    return {
        type: constants.ACTIVITY_REMOVE,
        payload: activity
    }
}

export function ActivityCloneSuccess(data:object): ApplicationAction {
    return {
        type: constants.ACTIVITY_CLONE_SUCCESS,
        payload: data
    }
}

export function ActivitiesListGetSuccess(activities:object[]): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST_SUCCESS,
        payload: activities 
    }
}

