import HasUser from "../HOC/WithUser";
import User from 'src/components/User/User';
import { StoreState, StravaAccount, AuthState } from 'src/types';
import { ApplicationAction } from 'src/redux/actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';


export interface UserUIState {
  auth:AuthState;
  user?:StravaAccount;
}

const mapStateToProps = (state: StoreState) => ({
  
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
export default enhanced(User);
