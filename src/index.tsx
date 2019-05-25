import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers'
import sagas from './sagas'
import registerServiceWorker from './registerServiceWorker';
import Hello from './containers/Hello/Hello';
import './index.css';
import Auth from './containers/Auth/Auth';

 // create the saga middleware
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));
// then run the saga
sagaMiddleware.run(sagas)

ReactDOM.render(
  <Router>
    <Provider store={store}>
    <Route path="/" exact component={Hello} />
    <Route path="/authcode" exact component={Auth} />
  </Provider>
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
