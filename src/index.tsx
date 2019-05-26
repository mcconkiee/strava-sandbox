import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import Hello from './containers/Hello/Hello';
import './index.css';
import Auth from './containers/Auth/Auth';
import Activities from './containers/Activities/Activities';
import { ACTIVITIES_ROUTE, AUTHCODE_ROUTE, ROOT, REAUTH } from './constants/routes';




ReactDOM.render(
  <div className="uk-container">
    <Router>
    <Provider store={store}>
    <Route path={ROOT} exact component={Hello} />
    <Route path={REAUTH} exact component={Hello} />
    <Route path={AUTHCODE_ROUTE} exact component={Auth} />
    <Route path={ACTIVITIES_ROUTE} exact component={Activities} />
  </Provider>
  </Router>
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
