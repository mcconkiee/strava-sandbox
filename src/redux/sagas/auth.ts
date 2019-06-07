import { call, put, takeLatest } from 'redux-saga/effects'
import { AUTHENTICATE_WITH_CODE, AUTHENTICATE_DOG, AUTHENTICATE_REFRESHTOKEN_SUCCESS, AUTHENTICATE_REFRESHTOKEN, AUTHENTICATE, DEAUTHENTICATE } from 'src/constants/redux';
import api from '../../lib/api';
import { ApplicationAction } from 'src/redux/actions';
import { AuthTokenSuccess, AuthenticateSuccess, AuthenticateError, AuthRefreshSuccess, AuthRefreshTokenSuccess, AuthRefreshTokenError, DeAuthenticateSuccess } from 'src/redux/actions/auth';
import { AuthenticateDogSuccess, AuthenticateDogTokenSuccess } from 'src/redux/actions/dogs';
import { REFRESH_TOKEN, ACCESS_TOKEN_TIMESTAMP, ACCESS_TOKEN, DOG_REFRESH_TOKEN, DOG_ACCESS_TOKEN, USER } from 'src/constants/localStorage';

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
         // FIXME - we only support one connected account for now...probaly need something like
         // localStorage.setItem(`${DOG_ACCESS_TOKEN}_${dogname}`, access_token); 
         // and then a localStorage helper to pull all tokens starting with `DOG_ACCESS_TOKEN`
         localStorage.setItem(DOG_ACCESS_TOKEN, access_token);
         yield put(AuthenticateDogTokenSuccess(access_token));
      } else {
         yield put(AuthTokenSuccess(access_token));
         localStorage.setItem(USER,tokenRequest.data.athlete.id)
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
         yield put(AuthenticateSuccess(gt.athlete.data));
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
      localStorage.setItem(ACCESS_TOKEN, tokenData.user.access_token);
      
      // FIXME - we only support one connected account for now...
      tokenData.accounts.forEach((account:any) => {
         localStorage.setItem(DOG_ACCESS_TOKEN, account.access_token);
      });
      yield put(AuthRefreshSuccess());
   } catch (error) {
      yield put(AuthenticateError(error));
   }
}

function* deauth(action: ApplicationAction){
   try {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(DOG_ACCESS_TOKEN);
      localStorage.removeItem(DOG_REFRESH_TOKEN);
      yield put(DeAuthenticateSuccess());
   } catch (error) {
      yield put(AuthenticateError(error));
   }
}

function* refreshToken (){
    try {
        const refresh = yield call(api.getApi,'/user/refresh');
        yield put(AuthRefreshTokenSuccess(refresh.data))
        yield put(AuthenticateSuccess(refresh.data.user.data))
    } catch (error) {
        yield put(AuthRefreshTokenError(error));
    }
}
export const auth = [
   takeLatest(AUTHENTICATE,refreshToken),
   takeLatest(DEAUTHENTICATE,deauth),
   takeLatest(AUTHENTICATE_REFRESHTOKEN,refreshToken),
   takeLatest(AUTHENTICATE_WITH_CODE, fetchToken),
   takeLatest(AUTHENTICATE_DOG, fetchToken),
   takeLatest(AUTHENTICATE_REFRESHTOKEN_SUCCESS,updateTokens)
]
