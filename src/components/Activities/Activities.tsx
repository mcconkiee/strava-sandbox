import * as React from 'react';
import { ActivityState } from 'src/types';
import { ACTIVITIES_ROUTE } from 'src/constants/routes';


class Activities extends React.Component<ActivityState, object> {
  
  render() {    
    return (
      <div className={ACTIVITIES_ROUTE}>        
        activiites
      </div>
    );
  }
}

export default Activities;


