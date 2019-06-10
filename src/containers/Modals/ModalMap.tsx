import { connect } from "react-redux";
import { Dispatch } from "redux";
import Map from "../../components/Modal/Map";
import { StoreState } from "../../types/index";
import { ActivityDeSelected } from "src/redux/actions/activities";
import { getActivityState, getSelectedActivity } from 'src/redux/selectors/activities';

const mapStateToProps = (state: StoreState) => ({
  activity: getActivityState(state),  
  selectedActivity: getSelectedActivity(state)
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  deselectActivity: () => dispatch(ActivityDeSelected())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
