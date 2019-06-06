import * as React from "react";
const moment = require("moment");
import * as DefaultAction from "../../redux/actions";
import { ActivityClone, ActivityRemove } from "../../redux/actions/activities";
import { connect } from "react-redux";
import { StoreState, ActivityState, DogState } from "src/types";
export interface Activity {
  activity: ActivityState;
  dogs: DogState;
  item: object;
  cloneActivity: (data: object) => void;
  removeActivity: (item: object) => void;
}
const metersToMiles = (meters: number): string => {
  return Math.max(Math.round(meters * 0.000621371 * 10) / 10, 2.8).toFixed(1);
};
const cloning = (queuedObjects: object[], item: object): boolean => {
  return queuedObjects.filter(obj => obj["id"] === item["id"]).length >= 1;
};
const matchedDogs = (props: Activity) => {
  const {item,dogs,activity} = props;
  if (dogs.loading) {
    return (
      <span>
        <div uk-spinner={1} />
      </span>
    );
  }
  if (dogs.dogs && item) {
    const _dogs: any[] = dogs.dogs.filter((dog: any) => {
      const matches = dog.matches.filter(
        (m: string) => m === `${item['id']}`
      );
      return matches.length > 0;
    });
    if (_dogs.length > 0) {
      return _dogs.map(d => (
        <div key={d.id}>
          {d.firstname} 
        </div>
      ));
    } else {
      return dogs.dogs.map((d: any) => {
        if(cloning(activity.queuedToClone, item)){
          return <div uk-spinner={1} />
        }
        return (
          <button
            className="uk-button uk-button-primary"
            onClick={() => {
              // props.removeActivity(props.item);
              props.cloneActivity(item);
            }}
          >
            Add to {d.firstname}
          </button>
        );
      });
    }
  }
  return null;
};
const Activity = (props: Activity) => {
  return (
    <tr>
      <td>
        <a target="_blank" href={`https://www.strava.com/activities/${props.item["id"]}`}>
          {props.item["name"]}
        </a>
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
  cloneActivity: (data: object) => void;
  removeActivity: (activity: any) => void;
}

export const mapStateToProps = (state: StoreState): StateFromProps => {
  return { activity: state.activity, dogs: state.dogs };
};
export const mapDispatchToProps = (
  dispatch: React.Dispatch<DefaultAction.ApplicationAction>
): DispatchFromProps => ({
  cloneActivity: (data: object) => dispatch(ActivityClone(data)),
  removeActivity: (activity: any) => dispatch(ActivityRemove(activity))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
