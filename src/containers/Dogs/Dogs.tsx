import { connect } from "react-redux";
import { Dispatch } from "redux";
import Dogs from "../../components/Dogs/Dogs";
import { StoreState } from "../../types/index";
import {GetDogs} from "src/redux/actions/dogs"
export function mapStateToProps(state: StoreState) {
  return state.dogs;
}
export function mapDispatchToProps(
  dispatch: Dispatch
) {
  return {
    getDogs:()=>(dispatch(GetDogs()))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dogs);
