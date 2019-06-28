import { call, put, takeLatest } from 'redux-saga/effects'
import { AUTHENTICATE_WITH_CODE, AUTHENTICATE_DOG, AUTHENTICATE_REFRESHTOKEN_SUCCESS, AUTHENTICATE_REFRESHTOKEN, AUTHENTICATE, DEAUTHENTICATE } from 'src/constants/redux';
import api from '../../lib/api';
import { ApplicationAction } from 'src/redux/actions';
import { AuthTokenSuccess, AuthenticateSuccess, AuthenticateError, AuthRefreshSuccess, AuthRefreshTokenSuccess, AuthRefreshTokenError, DeAuthenticateSuccess } from 'src/redux/actions/auth';
import { AuthenticateDogSuccess, AuthenticateDogTokenSuccess } from 'src/redux/actions/dogs';
import { ACCESS_TOKEN_TIMESTAMP, ACCESS_TOKEN, USER, UUID, UUID_DOG } from 'src/constants/localStorage';
const uuidv4 = require('uuid/v4');

function* getToken(action: ApplicationAction) {
   try {
      const { type, payload } = action;
      const tokenRequest = yield call(api.tokenExchange, payload);
      const { access_token } = tokenRequest.data;
     
      if (type === AUTHENTICATE_DOG) {
         localStorage.setItem(`${UUID_DOG}_${tokenRequest.data.athlete.id}`,uuidv4())
         yield put(AuthenticateDogTokenSuccess(access_token));
      } else {
         yield put(AuthTokenSuccess(access_token));
         localStorage.setItem(UUID,uuidv4());
         localStorage.setItem(USER,tokenRequest.data.athlete.id)
         localStorage.setItem(ACCESS_TOKEN, access_token);
         localStorage.setItem(ACCESS_TOKEN_TIMESTAMP, new Date().getTime().toString());
      }

      return tokenRequest.data;
   } catch (error) {
      yield put(AuthenticateError(error));
   }
}

function* authenticateWithOathCode(action: ApplicationAction) {
   try {
      const gt = yield call(getToken, action);
      if (action.type === AUTHENTICATE_WITH_CODE) {
         yield put(AuthenticateSuccess(gt.athlete.data));
         yield call(api.postApi, '/user', { user: gt.athlete,refresh_token:gt.refresh_token,access_token:gt.access_token })
      } else {
         // TODO - remove this once we are complete removing strava pet accounts
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
      // tokenData.accounts.forEach((account:any) => {
      //    localStorage.setItem(DOG_ACCESS_TOKEN, account.access_token);
      // });
      yield put(AuthRefreshSuccess());
   } catch (error) {
      yield put(AuthenticateError(error));
   }
}

function* deauth(action: ApplicationAction){
   try {
      localStorage.removeItem(ACCESS_TOKEN);
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
   takeLatest(AUTHENTICATE_WITH_CODE, authenticateWithOathCode),   
   takeLatest(AUTHENTICATE_REFRESHTOKEN,refreshToken),
   takeLatest(AUTHENTICATE_REFRESHTOKEN_SUCCESS,updateTokens),
   takeLatest(AUTHENTICATE_DOG, authenticateWithOathCode)
]
