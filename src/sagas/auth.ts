import { call, put, takeLatest } from 'redux-saga/effects'
import {  AUTHENTICATE_WITH_CODE } from 'src/constants';
import api from '../lib/api';
import { ApplicationAction } from 'src/actions';
import { AuthTokenSuccess, AuthenticateSuccess, AuthenticateError } from 'src/actions/auth';
import { ActivitiesListGet } from 'src/actions/activities';

function* getToken(code:string){
    try {
       const tokenRequest = yield call(api.token,code) ;
       yield put(AuthTokenSuccess(tokenRequest.data.access_token));       
       return tokenRequest.data;
    } catch (error) {
       yield put(AuthenticateError(error)); 
    }
}

function* fetchToken(action:ApplicationAction) {
   try {
    const gt = yield call(getToken,action.payload);
    yield put(AuthenticateSuccess(gt.athlete));
    yield put(ActivitiesListGet());
   } catch (e) {
      yield put(AuthenticateError(e));
   }
}
export const auth = [
  takeLatest(AUTHENTICATE_WITH_CODE, fetchToken),
]
