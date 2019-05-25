import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import Hello from './containers/Hello/Hello';
import './index.css';
import Auth from './containers/Auth/Auth';


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
