import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from './redux/sagas'
import reducers from './redux/reducers'
 // create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// then run the saga
sagaMiddleware.run(sagas)
export default store;
