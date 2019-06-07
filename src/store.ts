import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import sagas from './redux/sagas'
import reducers from './redux/reducers'
 // create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const store = createStore(reducers,composeEnhancers(applyMiddleware(sagaMiddleware)));
// then run the saga
sagaMiddleware.run(sagas)
export default store;
