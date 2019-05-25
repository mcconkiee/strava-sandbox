import * as React from 'react';
import { ActivityState } from 'src/types';
import { ACTIVITIES_ROUTE, REAUTH } from 'src/constants/routes';
import { Redirect } from 'react-router';
import List from './List';


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
        <List listItems={this.props.activities}/>
      </div>
    );
  }
}

export default Activities;


