import {combineReducers} from 'redux';
import {activity} from './activities';
import {auth} from './auth'
import {hello} from './hello'
import { StoreState } from 'src/types';

const reducers = combineReducers<StoreState>({activity, auth, hello});
export default reducers;
