
import {call,  put, takeLatest } from 'redux-saga/effects'
import { ACTIVITY_LIST } from 'src/constants';
import { ApplicationAction } from 'src/actions';
import store from '../store';
import { ActivityError } from 'src/actions/activities';
const strava = require('strava-v3');

function* getStravaActivities(){
    try {
        const state =store.getState();
        const access_token = state.auth.accessToken;
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
    console.log(activities,"activities");
    
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
export const activity = [
  takeLatest(ACTIVITY_LIST, fetchActivities),
]
