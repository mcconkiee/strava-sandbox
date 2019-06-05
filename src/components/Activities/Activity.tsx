import * as React from "react";
const moment = require("moment");
import * as DefaultAction from "../../redux/actions";
import {  ActivityClone ,ActivityRemove} from "../../redux/actions/activities";
import { connect } from "react-redux";
import { StoreState } from "src/types";
export interface Activity {
  item: object;  
  cloneActivity: (data: object) => void;
  removeActivity: (item:object) => void;
}
const metersToMiles = (meters:number):string => {
  return Math.max( Math.round((meters * 0.000621371) * 10) / 10, 2.8 ).toFixed(1);  
}

const matchedDogs = (props:any)=>{
  if(props.dogs.loading){
    return <span>Loading...</span>
  }
  if(props.dogs.dogs && props.item){
    const dogs: any[] = props.dogs.dogs.filter((dog:any)=>{
      const matches = dog.matches.filter((m:string)=> m === `${props.item.id}`)
      return matches.length > 0;
    })
    if(dogs.length > 0){
      return dogs.map(d => <div key={d.id}>
        {d.firstname} {' '}
        <a href={`https://www.strava.com/activities/${props.item.id}`} target="_blank">Visit</a>
        {/* <button className="primary" onClick={()=>{        
          props.removeActivity(props.item);
        }} >Remove</button> */}
      </div> );      
    }    
  }
  return null
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
      <td>{matchedDogs(props)}</td>
    </tr>
  );
};
export function mapStateToProps(state: StoreState) {
  return {activity:state.activity,dogs:state.dogs};
}
export function mapDispatchToProps(
  dispatch: React.Dispatch<DefaultAction.ApplicationAction>
) {
  return {
    cloneActivity: (data: object) => dispatch(ActivityClone(data)),
    removeActivity:(activity:any)=> dispatch(ActivityRemove(activity))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity);
