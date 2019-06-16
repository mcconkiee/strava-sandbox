import { connect } from "react-redux";
import { Dispatch } from "redux";
import Auth from "../../components/Auth/Auth";
import * as actions from "../../redux/actions/auth";
import { AuthenticateDogWithCode } from "../../redux/actions/dogs";
import { StoreState } from "../../types/index";
import { getAuthState } from 'src/redux/selectors/auth';

export interface AuthUIState{
  location:any;
  accessToken:string;  
  authenticateWithCode:(code: string, dogs: boolean)=>void;
}

const mapStateToProps = (state: StoreState) => ({  
  auth: getAuthState(state),
})
const mapDispatchToProps = (
  dispatch: Dispatch
)=> ({
  authenticateWithCode: (code: string, dogs: boolean = false) =>
      dogs ? dispatch(AuthenticateDogWithCode(code)) : dispatch(actions.AuthenticateWithCode(code))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
