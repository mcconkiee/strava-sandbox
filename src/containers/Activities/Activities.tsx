import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getActivityState, getLoading } from "src/redux/selectors/activities";
import { getDogState } from "src/redux/selectors/dogs";
import Activities from "../../components/Activities/Activities";
import { ActivitiesListGet } from "../../redux/actions/activities";
import { GetDogs } from "../../redux/actions/dogs";
import { StoreState, ActivityState, DogState } from "../../types/index";

interface StateFromProps {
  activity: ActivityState;
  dogs: DogState;
  loading:boolean;
}

interface DispatchFromProps {
  getActivitiesList: () => void;
  getDogs: () => void;  
}

const mapStateToProps = (state: StoreState): StateFromProps => ({
  activity: getActivityState(state),
  dogs: getDogState(state),
  loading: getLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
  getActivitiesList: (page: number = 1) => dispatch(ActivitiesListGet(page)),
  getDogs: () => dispatch(GetDogs())
});

export default connect<StateFromProps, DispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(Activities);
