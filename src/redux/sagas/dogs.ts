import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ACCESS_TOKEN } from 'src/constants/localStorage';
import { ACTIVITY_CLONE, ACTIVITY_REMOVE, ADD_DOG_SUCCESS, DOGS_GET_ALL, ADD_DOG } from 'src/constants/redux';
import api from 'src/lib/api';
import { ActivityCloneSuccess, ActivityQueueForCloneSuccess } from 'src/redux/actions/activities';

import { ApplicationAction } from '../actions';
import { DogsError, GetDogsSuccess, AddDogSuccess } from '../actions/dogs';


function* cloneActivityToDog(action: ApplicationAction) {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const activity = action.payload;

        //FIXME - for now, assume we clone all        
        const state = yield select();
        if (state && state.dogs && state.dogs.dogs) {
            for (const dog of state.dogs.dogs) {
                const response = yield call(api.postApi, `/activity/${activity.id}/clone`, { activity: activity, t: token, d: dog['id'] })
                if(response && response.data && !response.data.error){
                    yield put(ActivityQueueForCloneSuccess({activity}));        
                }
            }
            yield put(ActivityCloneSuccess({}));
        }


        yield call(getAllDogs);
    } catch (error) {
        yield put(DogsError(error));
    }
}

function* removeActivityToDog(action: ApplicationAction) {
    try {
        const activity = action.payload;

        //FIXME - for now, assume we assume all        
        const state = yield select();
        if (state && state.dogs && state.dogs.dogs) {
            for (const dog of state.dogs.dogs) {
                yield call(api.postApi, `/activity/${activity.id}/remove`, { activity: activity, d: dog['id'] })
            }
        }
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

function* addNewDog(action:ApplicationAction) {
    try {
        const dog = yield call(api.postApi, `/user/dogs`,action.payload)
        yield put(AddDogSuccess(dog)) 
    } catch (error) {
        yield put(DogsError(error));
    }
}

export const dogs = [
    takeLatest(ADD_DOG, addNewDog),
    takeLatest(ADD_DOG_SUCCESS,getAllDogs),
    takeLatest(ACTIVITY_CLONE, cloneActivityToDog),
    takeLatest(ACTIVITY_REMOVE, removeActivityToDog),
    takeLatest(DOGS_GET_ALL, getAllDogs),
    takeLatest(ADD_DOG_SUCCESS, getAllDogs),
]
