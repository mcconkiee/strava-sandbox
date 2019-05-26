
import {call,  put, takeLatest } from 'redux-saga/effects'
import { ACTIVITY_LIST, ACTIVITY_ERROR } from '../constants/redux';
import { ApplicationAction } from 'src/actions';
// import store from '../store';
import { ActivityError,  ActivitiesListGetSuccess } from 'src/actions/activities';
import { ACCESS_TOKEN } from 'src/constants/localStorage';

const strava = require('strava-v3');



function* getStravaActivities(page:number){
    try {
        const access_token = localStorage.getItem(ACCESS_TOKEN)
        return yield new Promise((res,rej)=>{
            strava.athlete.listActivities({access_token,page},(err:Error,results:any)=>{
                if(err){                    
                    return rej(err);
                }
                if(results.errors){
                    return rej(results);
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
    const activities:any = yield call(getStravaActivities,action.payload);
    // reset the list
    yield put(ActivitiesListGetSuccess([])); 
    // add new results
    yield put(ActivitiesListGetSuccess(activities));    
   } catch (e) {
      yield put({type: ACTIVITY_ERROR, message: e.message});
   }
}
export const activity = [
  takeLatest(ACTIVITY_LIST, fetchActivities),
]
