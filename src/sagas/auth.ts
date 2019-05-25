import { call, put, takeLatest } from 'redux-saga/effects'
import {  AUTHENTICATE_WITH_CODE } from 'src/constants';
import api from '../lib/api';
import { ApplicationAction } from 'src/actions';
import { AuthTokenSuccess, AuthenticateSuccess } from 'src/actions/auth';
// import { AuthenticateSuccess, AuthTokenSuccess } from 'src/actions/auth';

// const strava = require('strava-v3');
// const getTokenPromise = (code:string)=>{
//     return new Promise((rej,res)=>{
//     strava.oauth.getToken(code,(err:Error,result:object)=>{
//         if(err){
//             return rej(err);
//         }
//         res(result);
//     })
// })
// }
function* getToken(code:string){
    try {
       const tokenRequest = yield call(api.token,code) ;
       yield put(AuthTokenSuccess(tokenRequest.data.access_token));
       yield put(AuthenticateSuccess(tokenRequest.data.athlete));
    //    yield put(AuthTokenSuccess,tokenRequest.data.acce);
       return tokenRequest.data;
    } catch (error) {
       yield put({type: "USER_FETCH_FAILED", message: error.message}); 
    }
}

function* fetchToken(action:ApplicationAction) {
   try {
    const gt = yield call(getToken,action.payload);
    console.log(gt,'GT!')
    // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}
export const auth = [
  takeLatest(AUTHENTICATE_WITH_CODE, fetchToken),
]
