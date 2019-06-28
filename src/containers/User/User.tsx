import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import User from 'src/components/User/User';
import { ApplicationAction } from 'src/redux/actions';
import { AuthState, StoreState, StravaAccount } from 'src/types';

import HasNav from '../HOC/WithNav';
import HasUser from '../HOC/WithUser';


export interface UserUIState {
  auth:AuthState;
  user?:StravaAccount;
}

const mapStateToProps = (state: StoreState) => ({
  
});

const mapDispatchToProps = (dispatch: Dispatch<ApplicationAction>) => ({
  
});

const enhanced = compose(
  HasNav,
  HasUser,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
);
export default enhanced(User);
