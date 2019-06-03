import * as React from 'react';
import { Link } from 'react-router-dom';
import './Dogs.css';
import { DogState } from 'src/types';
import { authURL } from 'src/constants/auth';
import { ACTIVITIES_ROUTE } from 'src/constants/routes';

class Dogs extends React.Component<DogState, object> {
  
  render() {
    return (
      <div className="dog">
        <h4>Auth a dog</h4>
        <a href={authURL(true)}>Auth</a>
        <div>
        <Link to={ACTIVITIES_ROUTE} title="Activities">Activities</Link>
      </div>
      </div>
    );
  }
}

export default Dogs;

