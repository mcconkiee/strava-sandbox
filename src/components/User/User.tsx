import * as React from "react";
import { authURL } from "src/constants/auth";
import { UserUIState } from "src/containers/User/User";

const User = (props: UserUIState) => {
  const { user, auth } = props;
  if (auth && auth.error) {
    return (
      <div>
        <h1>Oh no!</h1>
        <div>
          Error authenticating...please <a href={authURL()}>re-authenticate</a>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="user">
        <div>{user.firstname} {user.lastname}</div>
        <div>{user.id}</div>
      </div>
    );
  }
  
  return <div uk-spinner={1} />;
};

export default User;
