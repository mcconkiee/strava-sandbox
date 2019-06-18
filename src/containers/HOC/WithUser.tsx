import * as React from "react";
import { connect } from "react-redux";
import { StravaAccount, StoreState, AuthState } from "src/types";
import { getUser, getAuthState, getRefreshing } from "src/redux/selectors/auth";
import { getLoadingActivities } from "src/redux/selectors/activities";
import { Dispatch } from "redux";
import { Authenticate, DeAuthenticate } from "src/redux/actions/auth";

export interface WithUser {
  auth?: AuthState;
  user?: StravaAccount;
  loading: boolean;
  getUser: () => void;
  deAuth: () => void;
}
interface StateFromProps {
  auth: AuthState;
  refreshingUserState:boolean;
  user?: StravaAccount;
  loading: boolean;
}

interface DispatchFromProps {
  getUser: () => void;
  deAuth: () => void;
}

const mapStateToProps = (state: StoreState): StateFromProps => ({
  auth: getAuthState(state),
  refreshingUserState: getRefreshing(state),
  user: getUser(state),
  loading: getLoadingActivities(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
  getUser: () => dispatch(Authenticate()),
  deAuth: () => dispatch(DeAuthenticate())
});

export function HasUser(Comp: React.ComponentClass): React.ComponentClass {
  class WrappedComponent extends React.Component<WithUser> {
    componentDidMount() {
      if (!this.props.user) {
        this.props.getUser();
      }
    }
    public render() {
      return <Comp {...this.props} />;
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedComponent);
}

export default HasUser;
