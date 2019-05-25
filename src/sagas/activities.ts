
import {call,  put, takeLatest } from 'redux-saga/effects'
import { ACTIVITY_LIST } from '../constants/redux';
import { ApplicationAction } from 'src/actions';
// import store from '../store';
import { ActivityError,  ActivitiesListGetSuccess } from 'src/actions/activities';
import { ACCESS_TOKEN } from 'src/constants/localStorage';

const strava = require('strava-v3');



function* getStravaActivities(){
    try {
        const access_token = localStorage.getItem(ACCESS_TOKEN)
        return yield new Promise((res,rej)=>{
            strava.athlete.listActivities({access_token},(err:Error,results:any)=>{
                if(err){                    
                    return rej(err);
                }
                return res(results);
            })
        })
    } catch (error) {
        return put(ActivityError(error));
    }
}

function* fetchActivities(action:ApplicationAction) {
   try {       
    const activities:any = yield call(getStravaActivities);
    yield put(ActivitiesListGetSuccess(activities));    
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
export const activity = [
  takeLatest(ACTIVITY_LIST, fetchActivities),
]
