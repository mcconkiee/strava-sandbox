import * as React from "react";
const moment = require("moment");
import * as DefaultAction from '../../redux/actions';
import {ActivityUpdate} from '../../redux/actions/activities';
import { connect } from 'react-redux';
import { StoreState } from 'src/types';
export interface Activity {
  item: object;
  updateActivity?:(data:object)=>void;
}
const Activity = (props: Activity) => {
  return (
    <tr>
      <td>{props.item["name"]}</td>
      <td>
        {props.item["visibility"] === 'everyone' ? "Public" : "Private"} <a onClick={() => {
            const ifPrivate = props.item['private'];
            const isPrivate = ifPrivate ? false : true;
            props.item['visibility'] = isPrivate ? "only_me" : "everyone";
            props.item['private'] = isPrivate;
            if(props.updateActivity){
              props.updateActivity(props.item);
            }
            
        }}>Add to dogs</a>
      </td>
      <td>{moment(props.item["start_date"]).format("MMM DD, YYYY h:mm a")}</td>
    </tr>
  );
};
export function mapStateToProps(state: StoreState) {
  return state.activity;
}
export function mapDispatchToProps(dispatch: React.Dispatch<DefaultAction.ApplicationAction>) {
  return {    
    updateActivity:(data:object)=> dispatch(ActivityUpdate(data)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
