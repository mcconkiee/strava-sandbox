import { call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import api from 'src/lib/api';
import { ApplicationAction } from 'src/redux/actions';
import { ActivitiesListGetSuccess, ActivityError, ActivityUpdateSucces } from 'src/redux/actions/activities';
import { AuthRefreshToken } from 'src/redux/actions/auth';

import { ACTIVITY_LIST, ACTIVITY_UPDATE, AUTHENTICATE_SUCCESS, DOG_ERROR } from '../../constants/redux';
import { getCurrentPage } from '../selectors/activities';



// FIXME - duplicate of refresh in auth sagas - remove to optimize
function* refreshAndRetry() {
    try {
        yield put(AuthRefreshToken())
    } catch (error) {
        yield put(ActivityError(error));
    }
}


function* fetchPage(page: number) {
    try {
        const response = yield call(api.getStrava, `/athlete/activities?page=${page}`);
    if (response.errors) {
        yield call(refreshAndRetry);
        return;
    }
    // reset the list
    yield put(ActivitiesListGetSuccess([]));
    // add new results
    yield put(ActivitiesListGetSuccess(response.data));
    } catch (error) {
        yield call(refreshAndRetry);
    }
}

function* fetchActivitiesOnAuth() {
    const page = yield select(getCurrentPage)
    yield call(fetchPage,page);
}

function* fetchActivities(action: ApplicationAction) {
    yield call(fetchPage,action.payload);
}

function* updateActivity(action: ApplicationAction) {
    try {
        const activity = action.payload;
        const response = yield call(api.putStrava, `/activities/${activity.id}`, action.payload)
        if (response.errors) {
            throw response.message;
        }
        yield put(ActivityUpdateSucces(response.data));

    } catch (error) {
        yield put(ActivityError(error));
    }
}
// function* addActivityToLoadingQue(action: ApplicationAction) {
//     yield put(ActivityQueueForClone(action.payload))
// }

export const activity = [
    // takeEvery(ACTIVITY_CLONE, addActivityToLoadingQue),
    takeLeading(ACTIVITY_LIST, fetchActivities),
    takeLatest(ACTIVITY_UPDATE, updateActivity),
    takeLatest(AUTHENTICATE_SUCCESS, fetchActivitiesOnAuth),
    takeLatest(DOG_ERROR, refreshAndRetry)
]
