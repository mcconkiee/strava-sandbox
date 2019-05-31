import { call, put, takeLatest } from 'redux-saga/effects'
import { AUTHENTICATE_WITH_CODE, AUTHENTICATE_DOG } from 'src/constants/redux';
import api from '../../lib/api';
import { ApplicationAction } from 'src/redux/actions';
import { AuthTokenSuccess, AuthenticateSuccess, AuthenticateError } from 'src/redux/actions/auth';
import { REFRESH_TOKEN, ACCESS_TOKEN_TIMESTAMP, ACCESS_TOKEN, DOG_REFRESH_TOKEN, DOG_ACCESS_TOKEN } from 'src/constants/localStorage';

function* getToken(action: ApplicationAction) {
   try {
      const { type, payload } = action;
      const tokenRequest = yield call(api.tokenExchange, payload);
      const { refresh_token } = tokenRequest.data;
      const { access_token } = tokenRequest.data;
      if (refresh_token) {
         if (type === AUTHENTICATE_DOG) {
            localStorage.setItem(DOG_REFRESH_TOKEN, refresh_token);
         } else
            localStorage.setItem(REFRESH_TOKEN, refresh_token);
      }

      
      if (type === AUTHENTICATE_DOG) {
         localStorage.setItem(DOG_ACCESS_TOKEN, access_token);            
         yield put(AuthTokenSuccess(access_token));
      } else {
         yield put(AuthTokenSuccess(access_token));
         localStorage.setItem(ACCESS_TOKEN, access_token);
         localStorage.setItem(ACCESS_TOKEN_TIMESTAMP, new Date().getTime().toString());
      }

      return tokenRequest.data;
   } catch (error) {
      yield put(AuthenticateError(error));
   }
}

function* fetchToken(action: ApplicationAction) {
   try {
      const gt = yield call(getToken, action);
      yield put(AuthenticateSuccess(gt.athlete));
   } catch (e) {
      yield put(AuthenticateError(e));
   }
}


export const auth = [
   takeLatest(AUTHENTICATE_WITH_CODE, fetchToken),
   takeLatest(AUTHENTICATE_DOG, fetchToken)
]
