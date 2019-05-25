import * as React from 'react';
import { ActivityState } from 'src/types';
import { ACTIVITIES_ROUTE, REAUTH } from 'src/constants/routes';
import { Redirect } from 'react-router';


class Activities extends React.Component<ActivityState, object> {
  componentDidMount(){
      if(this.props.getActivitiesList){
          this.props.getActivitiesList();
      }
  }
  render() {
    if(this.props.error){
        return <Redirect to={REAUTH} push/>
    }    
    return (
      <div className={ACTIVITIES_ROUTE}>        
        activiites
      </div>
    );
  }
}

export default Activities;


