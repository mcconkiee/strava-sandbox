import { connect } from "react-redux";
import { Dispatch } from "redux";
import Map from "../../components/Modal/Map";
import { StoreState, MapState } from "../../types/index";
import { ActivityDeSelected } from "src/redux/actions/activities";
import { getActivityState, getSelectedActivity } from 'src/redux/selectors/activities';
import { getMapState } from 'src/redux/selectors/map';
import { updateMap } from 'src/redux/actions/map';

const mapStateToProps = (state: StoreState) => ({
  activity: getActivityState(state),  
  selectedActivity: getSelectedActivity(state),
  map: getMapState(state),
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  deselectActivity: () => dispatch(ActivityDeSelected()),
  updateMap: (props:MapState) => dispatch(updateMap(props))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
