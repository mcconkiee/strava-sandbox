
import { call, put, select, takeLatest, takeLeading, takeEvery } from 'redux-saga/effects'
import { ACTIVITY_LIST, ACTIVITY_UPDATE, DOG_ERROR, ACTIVITY_CLONE, AUTHENTICATE_SUCCESS } from '../../constants/redux';
import { ApplicationAction } from 'src/redux/actions';
import { AuthRefreshToken } from 'src/redux/actions/auth';
import { ActivityError, ActivitiesListGetSuccess, ActivityUpdateSucces, ActivityQueueForClone } from 'src/redux/actions/activities';
import api from 'src/lib/api';
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
function* addActivityToLoadingQue(action: ApplicationAction) {
    yield put(ActivityQueueForClone(action.payload))
}

export const activity = [
    takeEvery(ACTIVITY_CLONE, addActivityToLoadingQue),
    takeLeading(ACTIVITY_LIST, fetchActivities),
    takeLatest(ACTIVITY_UPDATE, updateActivity),
    takeLatest(AUTHENTICATE_SUCCESS, fetchActivitiesOnAuth),
    takeLatest(DOG_ERROR, refreshAndRetry)
]
