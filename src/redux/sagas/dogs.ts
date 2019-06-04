import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import config from '../../config'
import { ActivityCloneSuccess } from 'src/redux/actions/activities';
import api from 'src/lib/api';
import { ApplicationAction } from '../actions';
import { DogsError, GetDogsSuccess } from '../actions/dogs';
import { ACTIVITY_CLONE, DOGS_GET_ALL } from 'src/constants/redux';
import { ACCESS_TOKEN, DOG_ACCESS_TOKEN } from 'src/constants/localStorage';


function* cloneActivityToDog(action: ApplicationAction) {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const dogToken = localStorage.getItem(DOG_ACCESS_TOKEN);
        const activity = action.payload;        
        const response = yield call(axios.post, `${config.apiurl}/activity/${activity.id}/clone`,{activity:activity,t:token,d:dogToken})        
        if (response.errors) {
            throw response.message;
        }
        
        yield call(api.postApi,`/user/dogs/${dogToken}/activities/match`,{activity})        
        yield put(ActivityCloneSuccess(response.data));
        yield call(getAllDogs);
    } catch (error) {
        yield put(DogsError(error));
    }
}

function* getAllDogs() {
    try {
        const dogs = yield call(api.getApi, `/user/dogs`)
        yield put(GetDogsSuccess(dogs.data.accounts))
    } catch (error) {
        yield put(DogsError(error));
    }
}

export const dogs = [
    takeLatest(ACTIVITY_CLONE, cloneActivityToDog),
    takeLatest(DOGS_GET_ALL,getAllDogs),
]
