import * as React from 'react';
import { connect } from 'react-redux';
import { ActivityState, DogState, StoreState, StravaActivity } from 'src/types';

import { metersToMiles } from '../../lib/conversions';
import * as DefaultAction from '../../redux/actions';
import { ActivityClone, ActivityRemove, ActivitySelected } from '../../redux/actions/activities';
import CloneButton from './CloneButton';
import Map from './Map';
import Dog from 'src/models/Dog';
const uuid = require('uuid/v4')
const UIkit = require('uikit');
const moment = require("moment");
export interface Activity {
  activity: ActivityState;
  dogs: DogState;
  item: StravaActivity;
  cloneActivity: (data: object,dog:Dog) => void;
  removeActivity: (item: object) => void;
  selectedActivity: (item: StravaActivity) => void;
}

const matchedDogs = (props: Activity) => {

  const { item, dogs } = props;
  if (dogs.loading || props.activity.loading) {
    return (
      <span>
        <div uk-spinner={1} />
      </span>
    );
  }
  if (dogs.dogs && item) {
    return dogs.dogs.map(dog => {
      return <CloneButton busy={props.dogs.loading} key={uuid()} dog={dog} activity={props} />
    })
  }
  return null;
};
const Activity = (props: Activity) => {
  return (
    <tr key={props.item.id}>
      <td>
        <a
          className="uk-button uk-button-default"
          target="_blank"
          href={`https://www.strava.com/activities/${props.item.id}`}
        >
          {props.item.name} ({props.item.id})
        </a>
        <div>
          <Map
            onMapClicked={() => {
              props.selectedActivity(props.item);
              UIkit.modal("#modal-map").show();
            }}
            activity={props.item}
          />
        </div>
      </td>

      <td>{metersToMiles(props.item["distance"])} miles</td>
      <td>{moment(props.item["start_date"]).format("MMM DD, YYYY h:mm a")}</td>
      <td>{matchedDogs(props)}</td>
    </tr>
  );
};

interface StateFromProps {
  activity: ActivityState;
  dogs: DogState;
}

interface DispatchFromProps {
  cloneActivity: (data: object, dog: Dog) => void;
  removeActivity: (activity: any) => void;
  selectedActivity: (activity: StravaActivity) => void;
}

export const mapStateToProps = (state: StoreState): StateFromProps => {
  return { activity: state.activity, dogs: state.dogs };
};
export const mapDispatchToProps = (
  dispatch: React.Dispatch<DefaultAction.ApplicationAction>
): DispatchFromProps => ({
  cloneActivity: (data: object, dog:Dog) => dispatch(ActivityClone(data,dog)),
  removeActivity: (activity: any) => dispatch(ActivityRemove(activity)),
  selectedActivity: (activity: StravaActivity) =>
    dispatch(ActivitySelected(activity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
