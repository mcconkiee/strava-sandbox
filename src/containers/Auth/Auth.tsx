import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Auth from '../../components/Auth/Auth';
import * as DefaultAction from '../../actions/';
import * as actions from '../../actions/auth';
import { AuthState } from '../../types/index';

export function mapStateToProps(state: AuthState) {
  return state;
}
export function mapDispatchToProps(dispatch: Dispatch<DefaultAction.ApplicationAction>) {
  return {    
    authenticateWithCode: (code:string) => dispatch(actions.AuthenticateWithCode(code)),    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
