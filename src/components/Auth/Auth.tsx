import * as React from "react";
import "./Auth.css";
import { Redirect } from "react-router";
import { AUTHCODE_ROUTE, DOGS } from "src/constants/routes";
import { AuthUIState } from "src/containers/Auth/Auth";
const queryString = require("query-string");

class Auth extends React.Component<AuthUIState> {
  state = { redirect: false };

  componentDidMount() {
    const { location } = this.props;
    if (location) {
      const values = queryString.parse(location.search);
      if (values.code) {
        const hasDogs = location.pathname.includes(DOGS);
        this.props.authenticateWithCode(values.code, hasDogs);
        this.setState({ redirect: true });
      }
    }
  }

  componentDidUpdate(prevProps: AuthUIState) {
    if (!prevProps.accessToken && this.props.accessToken != null) {
      this.setState({ redirect: true });
    }
  }

  render() {    
    if (this.state.redirect) {
      return <Redirect to={DOGS} push />;
    }

    return <div className={AUTHCODE_ROUTE}>Authpage</div>;
  }
}

export default Auth;
