import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import ModalMap from './containers/Modals/ModalMap';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes';
import PublicRoutes from './routes-public';
import store from './store';

ReactDOM.render(
  <div className="uk-container">
    <Router>
      <Provider store={store}>

        <div>
          <Switch>
            <PublicRoutes />
          </Switch>
          <Switch>
            <Routes />
          </Switch>
          
        </div>
        <ModalMap />
      </Provider>
    </Router>
  </div>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
