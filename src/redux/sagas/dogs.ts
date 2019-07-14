import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ACCESS_TOKEN } from 'src/constants/localStorage';
import {
    ACTIVITY_CLONE,
    ACTIVITY_CLONE_SUCCESS,
    ACTIVITY_REMOVE,
    ADD_DOG,
    ADD_DOG_SUCCESS,
    AUTHENTICATE_REFRESHTOKEN_SUCCESS,
    DOG_GET,
    DOGS_GET_ALL,
} from 'src/constants/redux';
import api from 'src/lib/api';
import Dog from 'src/models/Dog';
import {
    ActivitiesListGetSuccess,
    ActivityCloneSuccess,
    ActivityQueueForClone,
    ActivityQueueForCloneSuccess,
} from 'src/redux/actions/activities';
import { StravaActivity } from 'src/types';

import { ApplicationAction } from '../actions';
import { AddDogSuccess, DogsError, GetDogs, GetDogsSuccess, GetDogSuccess } from '../actions/dogs';


function* cloneActivityToDog(action: ApplicationAction) {
    try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const { activity, dog } = action.payload;
        yield put(ActivityQueueForClone(activity))
        const response = yield call(api.postApi, `/activity/${activity.id}/clone`, { activity: activity, t: token, d: dog.id })
        if (response && response.data && !response.data.error) {
            yield put(ActivityQueueForCloneSuccess(activity));
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
        const alldogs = dogs.data.accounts.map((dta:any)=>{
            return new Dog(dta)
        })
        yield put(GetDogsSuccess(alldogs))
    } catch (error) {
        yield put(DogsError(error));
    }
}

function* addNewDog(action: ApplicationAction) {
    try {
        const dog = yield call(api.postApi, `/user/dogs`, action.payload)
        yield put(AddDogSuccess(dog))
    } catch (error) {
        yield put(DogsError(error));
    }
}

function* getDog(action: ApplicationAction) {
    try {
        const rawpath: string = action.payload;
        // const path = rawpath.split("/")[2];// FIXME  - not safe, but works for now
        const dog = yield call(api.getApi, rawpath)
        // const dogObject: DogObject = {
        //     name: dog.data.data.data.firstname,
        //     matches: dog.data.activities.map((m: StravaActivity) => m.id),
        //     totalDistance: dog.data.data.totalDistance || 0
        // }
        const dogObject = new Dog(dog.data.data.data.firstname);
        dogObject.matches = dog.data.activities.map((m: StravaActivity) => m.id)
        dogObject.totalDistance = dog.data.data.totalDistance || 0

        yield put(ActivitiesListGetSuccess(dog.data.activities))
        yield put(GetDogSuccess(dogObject))
    } catch (error) {
        yield put(DogsError(error));
    }
}
function* fetchDogsList(action: ApplicationAction) {
    try {
        yield put(GetDogs())
    } catch (error) {
        yield put(DogsError(error));
    }
}

export const dogs = [
    takeLatest(ADD_DOG, addNewDog),
    takeLatest(DOG_GET, getDog),
    takeLatest(ACTIVITY_CLONE, cloneActivityToDog),
    takeLatest(ACTIVITY_REMOVE, removeActivityToDog),
    takeLatest(DOGS_GET_ALL, getAllDogs),
    takeLatest(ACTIVITY_CLONE_SUCCESS, fetchDogsList),
    takeLatest(ADD_DOG_SUCCESS, fetchDogsList),
    takeLatest(AUTHENTICATE_REFRESHTOKEN_SUCCESS, fetchDogsList),
]
