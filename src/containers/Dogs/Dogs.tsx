import { connect } from "react-redux";
import { Dispatch } from "redux";
import Dogs from "../../components/Dogs/Dogs";
import { StoreState} from "../../types/index";
import {GetDogs} from "src/redux/actions/dogs"
import { getDogState, getDogsLoading } from 'src/redux/selectors/dogs';
import { getAuthState, getRefreshing } from 'src/redux/selectors/auth';



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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dogs);
