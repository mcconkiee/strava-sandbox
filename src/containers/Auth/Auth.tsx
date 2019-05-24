import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Auth from '../../components/Auth/Auth';
import * as actions from '../../actions/auth';
import { AuthState } from '../../types/index';

export function mapStateToProps({ userName }: AuthState) {
  return {
    
  }
}
export function mapDispatchToProps(dispatch: Dispatch<actions.Authenticate>) {
  return {
    authenticate: () => dispatch(actions.Authenticate()),    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
