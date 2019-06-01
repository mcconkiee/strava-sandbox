import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import config from '../../config'
import { ActivityCloneSuccess } from 'src/redux/actions/activities';
import { ApplicationAction } from '../actions';
import { DogsError } from '../actions/dogs';
import { ACTIVITY_CLONE } from 'src/constants/redux';
import { ACCESS_TOKEN, DOG_ACCESS_TOKEN } from 'src/constants/localStorage';


function* cloneActivityToDog(action: ApplicationAction) {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const dogToken = localStorage.getItem(DOG_ACCESS_TOKEN);
        const activity = action.payload;        
        const response = yield call(axios.post, `${config.apiurl}/activity/${activity.id}/clone`,{activity:activity,t:token,d:dogToken})
        console.log(response,'from api');
        

        if (response.errors) {
            throw response.message;
        }
        yield put(ActivityCloneSuccess(response.data));

    } catch (error) {
        yield put(DogsError(error));
    }
}

export const dogs = [
    takeLatest(ACTIVITY_CLONE, cloneActivityToDog)
]
