
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects'
import { ACTIVITY_LIST, ACTIVITY_UPDATE, AUTHENTICATE_REFRESH_SUCCESS, DOG_ERROR, ACTIVITY_CLONE } from '../../constants/redux';
import { ApplicationAction } from 'src/redux/actions';
import { AuthRefreshTokenSuccess } from 'src/redux/actions/auth';
import { ActivityError, ActivitiesListGetSuccess, ActivityUpdateSucces, ActivitiesListGet, ActivityQueueForClone } from 'src/redux/actions/activities';
import api from 'src/lib/api';
import store from 'src/store'
function* refreshAndRetry(){
    try {
        const refresh = yield call(api.getApi,'/user/refresh');
        yield put(AuthRefreshTokenSuccess(refresh.data))
    } catch (error) {
        yield put(ActivityError(error));
    }
}
function* refreshActivities(){
    try {
        const page = store.getState().activity.page        
        yield put(ActivitiesListGet(page));
    } catch (error) {
       yield put(ActivityError(error)); 
    }
}
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
     
        yield call(refreshAndRetry);
        
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
function* addActivityToLoadingQue(action:ApplicationAction){
    yield put(ActivityQueueForClone(action.payload))
}

export const activity = [
    takeEvery(ACTIVITY_CLONE, addActivityToLoadingQue),
    takeLatest(ACTIVITY_LIST, fetchActivities),
    takeLatest(ACTIVITY_UPDATE, updateActivity),
    takeLatest(AUTHENTICATE_REFRESH_SUCCESS,refreshActivities), 
    takeLatest(DOG_ERROR,refreshAndRetry)
]
