import * as React from 'react';
import './Dogs.css';
import { DogState } from 'src/types';
import { authURL } from 'src/constants/auth';

class Dogs extends React.Component<DogState, object> {
  
  render() {
    return (
      <div className="dog">
        <h4>Auth a dog</h4>
        <a href={authURL(true)}>Auth</a>
      </div>
    );
  }
}

export default Dogs;

