import { combineReducers } from 'redux';
import { activity } from './activities';
import { auth } from './auth'
import { dogs } from './dogs'
import { hello } from './hello'
import { map } from './map'
import { StoreState } from 'src/types';

const reducers = combineReducers<StoreState>({ activity, auth, hello, dogs, map });
export default reducers;
