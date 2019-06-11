import * as constants from '../../constants/redux';
import { ApplicationAction } from '.';
import {  MapState } from 'src/types';


export function setMapActivitySuccess(activity:MapState): ApplicationAction {
    return {
        type: constants.MAP_SET_NEW_ACTIVITY,
        payload: activity
    }
}

export function mapError(error:Error): ApplicationAction {
    return {
        type: constants.MAP_ERROR,
        payload: error
    }
}
