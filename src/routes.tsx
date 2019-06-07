import * as React from "react";
import { Route } from "react-router-dom";
import Hello from "./containers/Hello/Hello";
import "./index.css";
import Auth from "./containers/Auth/Auth";
import User from "./containers/User/User";
import Activities from "./containers/Activities/Activities";
import {
  ACTIVITIES_ROUTE,
  AUTHCODE_ROUTE,
  ROOT,
  REAUTH,
  DOGS,
  DOGS_AUTHCODE_ROUTE,
  DOGS_AUTH,
  USER
} from "./constants/routes";
import Dogs from "./containers/Dogs/Dogs";
const Routes = () => {
  return (
    <div>
      <Route path={ROOT} exact component={Hello} />
      <Route path={REAUTH} exact component={Hello} />
      <Route path={AUTHCODE_ROUTE} exact component={Auth} />
      <Route path={ACTIVITIES_ROUTE} exact component={Activities} />
      <Route path={DOGS} exact component={Dogs} />
      <Route path={DOGS_AUTH} exact component={Hello} />
      <Route path={DOGS_AUTHCODE_ROUTE} exact component={Auth} />
      <Route path={USER} exact component={User} />
    </div>
  );
};
export default Routes;
