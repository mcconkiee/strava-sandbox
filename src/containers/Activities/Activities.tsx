import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Activities from '../../components/Activities/Activities';
import * as DefaultAction from '../../actions/';

import {  StoreState } from '../../types/index';

export function mapStateToProps(state: StoreState) {
  return state.activity;
}
export function mapDispatchToProps(dispatch: Dispatch<DefaultAction.ApplicationAction>) {
  return {    
    // authenticateWithCode: (code:string) => dispatch(actions.AuthenticateWithCode(code)),    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
