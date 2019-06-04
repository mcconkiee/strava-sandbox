import * as React from "react";
const moment = require("moment");
import * as DefaultAction from "../../redux/actions";
import {  ActivityClone } from "../../redux/actions/activities";
import { connect } from "react-redux";
import { StoreState } from "src/types";
export interface Activity {
  item: object;
  cloneActivity: (data: object) => void;
}
const metersToMiles = (meters:number):string => {
  return Math.max( Math.round((meters * 0.000621371) * 10) / 10, 2.8 ).toFixed(1);  
}
const Activity = (props: Activity) => {
  return (
    <tr>
      <td><a href={`https://www.strava.com/activities/${props.item['id']}`}>{props.item["name"]}</a></td>
      <td>{metersToMiles(props.item["distance"]) } miles</td>
      <td>        
        <a
          onClick={() => {
            props.cloneActivity(props.item);
          }}
        >
          Add to dogs
        </a>
      </td>
      <td>{moment(props.item["start_date"]).format("MMM DD, YYYY h:mm a")}</td>
      <td>x</td>
    </tr>
  );
};
export function mapStateToProps(state: StoreState) {
  return state.activity;
}
export function mapDispatchToProps(
  dispatch: React.Dispatch<DefaultAction.ApplicationAction>
) {
  return {
    cloneActivity: (data: object) => dispatch(ActivityClone(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
