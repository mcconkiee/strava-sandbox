import * as React from "react";
import { Link } from "react-router-dom";
import { ACTIVITIES_ROUTE, USER, DOGS } from "src/constants/routes";

const Nav = () => {
  return (
    <div>
      <div className="uk-button-group">
        <Link className="uk-button uk-button-default" to={USER}>
          Me
        </Link>
        <Link className="uk-button uk-button-default" to={DOGS}>
          Dogs
        </Link>
        <Link className="uk-button uk-button-default" to={ACTIVITIES_ROUTE}>
          Activities
        </Link>
      </div>
    </div>
  );
};
export default Nav;
