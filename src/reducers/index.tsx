import {combineReducers} from 'redux';
import {auth} from './auth'
import {hello} from './hello'
import { StoreState } from 'src/types';
// import { defautltAction } from 'src/actions';

// const helloState = hello({ enthusiasmLevel:1,languageName:"null"},defautltAction)
// const authState = auth({},defautltAction)
// const storeState:StoreState = {hello:helloState,auth:authState}
const reducers = combineReducers<StoreState>({auth,hello});
export default reducers;
