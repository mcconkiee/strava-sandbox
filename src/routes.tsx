import './index.css';

import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ACTIVITIES_ROUTE, DOGS, USER, ROOT, REAUTH, AUTHCODE_ROUTE, DOG_DETAILS, AUTHCODE_DOGS_ROUTE } from './constants/routes';
import Activities from './containers/Activities/Activities';
import Dogs from './containers/Dogs/Dogs';
import User from './containers/User/User';
import Hello from './containers/Hello/Hello';
import Auth from './containers/Auth/Auth';
import DogDetials from './containers/Dogs/DogDetials';
import NoMatch from './components/NoMatch';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route path={ROOT} exact component={Hello} />
        <Route path={ACTIVITIES_ROUTE} exact component={Activities} />
        <Route path={DOGS} exact component={Dogs} />
        <Route path={USER} exact component={User} />
        <Route path={REAUTH} component={Hello} />
        <Route path={AUTHCODE_ROUTE} component={Auth} />
        <Route path={AUTHCODE_DOGS_ROUTE} component={Auth} />
        <Route path={DOG_DETAILS} component={DogDetials} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};
export default Routes;
