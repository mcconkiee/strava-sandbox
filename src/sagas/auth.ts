import { call, put, takeLatest } from 'redux-saga/effects'
import {  AUTHENTICATE_WITH_CODE } from 'src/constants/redux';
import api from '../lib/api';
import { ApplicationAction } from 'src/actions';
import { AuthTokenSuccess, AuthenticateSuccess, AuthenticateError } from 'src/actions/auth';
import { REFRESH_TOKEN, ACCESS_TOKEN_TIMESTAMP, ACCESS_TOKEN } from 'src/constants/localStorage';

function* getToken(code:string){
    try {
       const tokenRequest = yield call(api.tokenExchange,code) ;
       const {refresh_token} = tokenRequest.data;
       const {access_token} = tokenRequest.data;
       if(refresh_token){
          localStorage.setItem(REFRESH_TOKEN,refresh_token);          
       }
       
       yield put(AuthTokenSuccess(access_token));
       localStorage.setItem(ACCESS_TOKEN,access_token);          
       localStorage.setItem(ACCESS_TOKEN_TIMESTAMP,new Date().getTime().toString());          
       return tokenRequest.data;
    } catch (error) {
       yield put(AuthenticateError(error)); 
    }
}

function* fetchToken(action:ApplicationAction) {
   try {
    const gt = yield call(getToken,action.payload);
    yield put(AuthenticateSuccess(gt.athlete));
   } catch (e) {
      yield put(AuthenticateError(e));
   }
}


export const auth = [
  takeLatest(AUTHENTICATE_WITH_CODE, fetchToken),
]
