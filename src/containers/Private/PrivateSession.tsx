import HasUser from "../HOC/WithUser";
import { StoreState, StravaAccount, AuthState } from 'src/types';
import { ApplicationAction } from 'src/redux/actions';
import { compose, Dispatch } from 'redux';
import { connect } from 'react-redux';
import PrivateSession from 'src/components/Private/PrivateSession';



export interface PrivateSessionState {
  auth:AuthState;
  user?:StravaAccount;
  children:React.ReactNode;
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
export default enhanced(PrivateSession);
