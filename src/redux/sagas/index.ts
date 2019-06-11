import { all } from 'redux-saga/effects'
import { activity } from './activities';
import { auth } from './auth';
import { dogs } from './dogs';
import { map } from './map';

export default function* rootSaga() {
  yield all([
    ...auth,
    ...activity,
    ...dogs,
    ...map,
  ])
}
