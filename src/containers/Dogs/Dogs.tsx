import { connect } from "react-redux";
import { Dispatch, compose } from "redux";
import Dogs from "../../components/Dogs/Dogs";
import { StoreState} from "../../types/index";
import {GetDogs} from "src/redux/actions/dogs"
import { getDogState, getDogsLoading } from 'src/redux/selectors/dogs';
import { getAuthState, getRefreshing } from 'src/redux/selectors/auth';
import HasNav from '../HOC/WithNav';
import HasUser from '../HOC/WithUser';



const mapStateToProps = (state: StoreState) => ({
  dogs: getDogState(state),
  auth: getAuthState(state),
  loading: getDogsLoading(state),
  refreshing: getRefreshing(state),
})
const mapDispatchToProps = (
  dispatch: Dispatch
)=> ({
  getDogs:()=>(dispatch(GetDogs()))
})

const enhanced =  compose(HasNav,HasUser,connect(mapStateToProps,mapDispatchToProps))
export default enhanced(Dogs);