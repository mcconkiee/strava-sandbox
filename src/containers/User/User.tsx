import * as React from "react";
import HasUser, { WithUser } from "../HOC/WithUser";
import { compose } from "redux";
import { authURL } from "src/constants/auth";

class User extends React.Component<WithUser, object> {
  render() {
    // error
    if (this.props.auth.error) {
      return (
        <div>
          <h1>Oh no!</h1>
          <div>
            Error authenticating...please{" "}
            <a href={authURL()}>re-authenticate</a>
          </div>
        </div>
      );
    }
    // no user
    if (!this.props.user) {
      return (
        <div>
          Click{" "}
          <a
            onClick={() => {
              this.props.deAuth();
            }}
          >
            here
          </a>{" "}
          to de-authenticate
        </div>
      );
    }

    const { user } = this.props;
    if (user) {
      return (
        <div className="user">
          <div>{user.firstname}</div>
        </div>
      );
    }

    return null
  }
}

export default compose(HasUser)(User);
