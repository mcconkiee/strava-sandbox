import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {AuthRefreshToken} from 'src/redux/actions/auth'
import Hello from '../../components/Hello/Hello';
import { StoreState } from '../../types/index';
import { ApplicationAction } from 'src/redux/actions';

export interface HelloUIState{  
  userData?:object;
  refreshToken:()=>void;
}

export function mapStateToProps(state: StoreState) {
  return state.auth;
}

export function mapDispatchToProps(dispatch: Dispatch<ApplicationAction>) {
  return {
    refreshToken: ()=> dispatch(AuthRefreshToken()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
