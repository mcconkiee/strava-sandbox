import { call, put, takeLatest } from 'redux-saga/effects'
import { AUTHENTICATE_WITH_CODE, AUTHENTICATE_DOG, AUTHENTICATE_REFRESHTOKEN_SUCCESS } from 'src/constants/redux';
import api from '../../lib/api';
import { ApplicationAction } from 'src/redux/actions';
import { AuthTokenSuccess, AuthenticateSuccess, AuthenticateError, AuthRefreshSuccess } from 'src/redux/actions/auth';
import { AuthenticateDogSuccess, AuthenticateDogTokenSuccess } from 'src/redux/actions/dogs';
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
         yield put(AuthenticateDogTokenSuccess(access_token));
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
      if (action.type === AUTHENTICATE_WITH_CODE) {
         yield put(AuthenticateSuccess(gt.athlete));
         yield call(api.postApi, '/user', { user: gt.athlete,refresh_token:gt.refresh_token })
      } else {
         yield put(AuthenticateDogSuccess(gt.athlete));
         yield call(api.postApi, `/user/connectAccount`, { user: gt.athlete,refresh_token:gt.refresh_token,access_token:gt.access_token })

      }
   } catch (e) {
      yield put(AuthenticateError(e));
   }
}

function* updateTokens(action: ApplicationAction){
   try {
      const tokenData = action.payload;
      localStorage.setItem(ACCESS_TOKEN, tokenData.access_token);
      yield put(AuthRefreshSuccess());
   } catch (error) {
      yield put(AuthenticateError(error));
   }
}

export const auth = [
   takeLatest(AUTHENTICATE_WITH_CODE, fetchToken),
   takeLatest(AUTHENTICATE_DOG, fetchToken),
   takeLatest(AUTHENTICATE_REFRESHTOKEN_SUCCESS,updateTokens)
]
