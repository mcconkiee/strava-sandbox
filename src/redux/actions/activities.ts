import * as constants from '../../constants/redux';
import { ApplicationAction } from '.';
import { StravaActivity } from 'src/types';
import Dog from 'src/models/Dog';

export interface ActivityError {
    type: constants.ACTIVITY_ERROR;
    payload: any;
}

export function ActivityError(error: Error): ActivityError {
    return {
        type: constants.ACTIVITY_ERROR,
        payload: error
    }
}

export function ActivitiesListGet(page: number): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST,
        payload: page
    }
}

export function ActivityUpdate(data: object): ApplicationAction {
    return {
        type: constants.ACTIVITY_UPDATE,
        payload: data
    }
}

export function ActivityUpdateSucces(data: object): ApplicationAction {
    return {
        type: constants.ACTIVITY_UPDATE_SUCCESS,
        payload: data
    }
}

export function ActivityClone(activity: object, dog: Dog): ApplicationAction {
    return {
        type: constants.ACTIVITY_CLONE,
        payload: {activity:activity, dog:dog}
    }
}

export function ActivityQueueForClone(activity: object): ApplicationAction {
    return {
        type: constants.ACTIVITY_QUEUE_TO_CLONE,
        payload: activity
    }
}

export function ActivityQueueForCloneSuccess(activity: object): ApplicationAction {
    return {
        type: constants.ACTIVITY_QUEUE_TO_CLONE_SUCCESS,
        payload: activity
    }
}

export function ActivityRemove(activity: object): ApplicationAction {
    return {
        type: constants.ACTIVITY_REMOVE,
        payload: activity
    }
}

export function ActivitySelected(activity: StravaActivity): ApplicationAction {
    return {
        type: constants.ACTIVITY_SELECTED,
        payload: activity
    }
}

export function ActivityDeSelected(): ApplicationAction {
    return {
        type: constants.ACTIVITY_DESELECTED,
        payload: undefined
    }
}

export function ActivityCloneSuccess(data: object): ApplicationAction {
    return {
        type: constants.ACTIVITY_CLONE_SUCCESS,
        payload: data
    }
}

export function ActivitiesListGetSuccess(activities: object[]): ApplicationAction {
    return {
        type: constants.ACTIVITY_LIST_SUCCESS,
        payload: activities
    }
}

