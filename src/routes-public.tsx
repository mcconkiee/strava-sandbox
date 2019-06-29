import './index.css';

import * as React from 'react';
import { Route } from 'react-router-dom';

import { AUTHCODE_ROUTE, DOG_DETAILS, REAUTH, ROOT } from './constants/routes';
import Auth from './containers/Auth/Auth';
import DogDetials from './containers/Dogs/DogDetials';
import Hello from './containers/Hello/Hello';
import NoMatch from './components/NoMatch';


const PublicRoutes = () => {
  return (
    <div>
      <Route path={ROOT} exact component={Hello} />
      <Route path={REAUTH} exact component={Hello} />
      <Route path={AUTHCODE_ROUTE} exact component={Auth} />      
      <Route path={DOG_DETAILS} exact component={DogDetials}/>
      <Route component={NoMatch} />
    </div>
  );
};
export default PublicRoutes;
