
import { call, put, takeLatest } from 'redux-saga/effects'
import { ACTIVITY_LIST, ACTIVITY_UPDATE } from '../../constants/redux';
import { ApplicationAction } from 'src/redux/actions';
import { ActivityError, ActivitiesListGetSuccess, ActivityUpdateSucces } from 'src/redux/actions/activities';
import api from 'src/lib/api';

function* fetchActivities(action: ApplicationAction) {
    try {
        const response = yield call(api.get, `/athlete/activities?page=${action.payload}`);
        if (response.errors) {
            throw response.message;
        }
        // reset the list
        yield put(ActivitiesListGetSuccess([]));
        // add new results
        yield put(ActivitiesListGetSuccess(response.data));
    } catch (error) {
        yield put(ActivityError(error));
    }
}
function* updateActivity(action: ApplicationAction) {
    try {
        const activity = action.payload;
        const response = yield call(api.put, `/activities/${activity.id}`, action.payload)
        if (response.errors) {
            throw response.message;
        }
        yield put(ActivityUpdateSucces(response.data));

    } catch (error) {
        yield put(ActivityError(error));
    }
}


export const activity = [
    takeLatest(ACTIVITY_LIST, fetchActivities),
    takeLatest(ACTIVITY_UPDATE, updateActivity),

]
