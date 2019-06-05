import { call, put, select, takeLatest } from 'redux-saga/effects'
import { ActivityCloneSuccess, ActivityQueueForCloneSuccess } from 'src/redux/actions/activities';
import api from 'src/lib/api';
import { ApplicationAction } from '../actions';
import { DogsError, GetDogsSuccess } from '../actions/dogs';
import { ACTIVITY_CLONE, DOGS_GET_ALL, ACTIVITY_REMOVE } from 'src/constants/redux';
import { ACCESS_TOKEN } from 'src/constants/localStorage';


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
            // yield all(state.dogs.dogs.map((d:any) => {
            //     call(axios.post, `${config.apiurl}/activity/${activity.id}/clone`, { activity: activity, t: token, d: d['id'] })                
            // }))
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

        //FIXME - for now, assume we clone all        
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

export const dogs = [
    takeLatest(ACTIVITY_CLONE, cloneActivityToDog),
    takeLatest(ACTIVITY_REMOVE, removeActivityToDog),
    takeLatest(DOGS_GET_ALL, getAllDogs),
]
