import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getActivityState, getLoading, getNeedsRefresh } from "src/redux/selectors/activities";
import { getDogState } from "src/redux/selectors/dogs";
import Activities from "../../components/Activities/Activities";
import { ActivitiesListGet } from "../../redux/actions/activities";
import { GetDogs } from "../../redux/actions/dogs";
import {
  StoreState,
  ActivityState,
  DogState,
  StravaAccount
} from "../../types/index";
import { Authenticate } from "src/redux/actions/auth";
import { getUser } from "src/redux/selectors/auth";
import HasUser from "../HOC/WithUser";

interface StateFromProps {
  activity: ActivityState;
  dogs: DogState;
  user?: StravaAccount;
  loading: boolean;
  needsUpdate:boolean;
}

interface DispatchFromProps {
  getActivitiesList: () => void;
  getDogs: () => void;
  getUser: () => void;
}

const mapStateToProps = (state: StoreState): StateFromProps => ({
  activity: getActivityState(state),
  dogs: getDogState(state),
  user: getUser(state),
  loading: getLoading(state),
  needsUpdate: getNeedsRefresh(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
  getActivitiesList: (page: number = 1) => dispatch(ActivitiesListGet(page)),
  getDogs: () => dispatch(GetDogs()),
  getUser: () => dispatch(Authenticate())
});

export default connect<StateFromProps, DispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(HasUser(Activities));
