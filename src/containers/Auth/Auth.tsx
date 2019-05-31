import { connect } from "react-redux";
import { Dispatch } from "redux";
import Auth from "../../components/Auth/Auth";
import * as DefaultAction from "../../redux/actions";
import * as actions from "../../redux/actions/auth";
import { AuthenticateDogWithCode } from "../../redux/actions/dogs";
import { StoreState } from "../../types/index";

export function mapStateToProps(state: StoreState) {
  return state.auth;
}
export function mapDispatchToProps(
  dispatch: Dispatch<DefaultAction.ApplicationAction>
) {
  return {
    authenticateWithCode: (code: string, dogs: boolean = false) =>
      dogs ? dispatch(AuthenticateDogWithCode(code)) : dispatch(actions.AuthenticateWithCode(code))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
