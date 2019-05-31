import { connect } from "react-redux";
import { Dispatch } from "redux";
import Dogs from "../../components/Dogs/Dogs";
import { StoreState } from "../../types/index";

export function mapStateToProps(state: StoreState) {
  return state.dogs;
}
export function mapDispatchToProps(
  dispatch: Dispatch
) {
  return {
    dispatch: dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dogs);
