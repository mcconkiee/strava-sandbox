import { connect } from "react-redux";
import { Dispatch, compose } from "redux";
import Hello from "../../components/Hello/Hello";
import { StoreState, StravaAccount, AuthState } from "../../types/index";
import { ApplicationAction } from "src/redux/actions";
import { getAuthState, getRefreshing, getUser } from "src/redux/selectors/auth";
import HasUser from "../HOC/WithUser";

export interface HelloUIState {
  userData?: StravaAccount;
  auth: AuthState;
  refreshing: boolean;
}

const mapStateToProps = (state: StoreState) => ({
  auth: getAuthState(state),
  userData: getUser(state),
  refreshing: getRefreshing(state)
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => ({
  
});

const enhanced = compose(
  HasUser,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
export default enhanced(Hello);
// export default connect(mapStateToProps, mapDispatchToProps)(Hello);
