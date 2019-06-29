import './index.css';

import * as React from 'react';
import { Route } from 'react-router-dom';

import { ACTIVITIES_ROUTE, DOGS, USER } from './constants/routes';
import Activities from './containers/Activities/Activities';
import Dogs from './containers/Dogs/Dogs';
import User from './containers/User/User';

const Routes = () => {
  return (
    <div>
      <Route path={ACTIVITIES_ROUTE} exact component={Activities} />
      <Route path={DOGS} exact component={Dogs} />      
      <Route path={USER} exact component={User} />
      
    </div>
  );
};
export default Routes;
