import './Dogs.css';

import * as React from 'react';
import { Link } from 'react-router-dom';
import ModalDog from 'src/containers/Modals/ModalDog';
import { AuthState, DogState } from 'src/types';
const uuid = require('uuid/v4')


interface DogUI {
  dogs: DogState;
  auth: AuthState;
  loading:boolean;
  refreshing:boolean;
}
const doglist = (dogState: DogState) => {
  if (dogState.dogs) {
    if(dogState.dogs.length === 0){
      return null;
    }
    return dogState.dogs.map(dog => {
      return <div key={uuid()}>
        <Link to={dog.path || '#'}>{dog.firstname}</Link>
      </div>;
    });
  }
  
  return null;
};
class Dogs extends React.Component<DogUI, object> {
  constructor(p: DogUI) {
    super(p);
    this.state = { fetchedDogs: false };
  }
  
  listDogs(): React.ReactNode {
    if (this.props.dogs) {      
      return <div>{doglist(this.props.dogs)}</div>;
    }
    return null;
  }

  render() {
    if(this.props.refreshing){
      return <div uk-spinner={1} />;
    }
    return (
      <div className="dog">
        <h4>Your Dogs!</h4>
        <div>
          <a className="uk-button uk-button-primary" onClick={()=>{
            UIkit.modal("#modal-dog").show();
          }}>
            Add a Dog!
          </a>
          <ModalDog />
        </div>
        {this.props.dogs.loading ? <div uk-spinner={1}></div> : null}
        <div>{this.listDogs()}</div>
      </div>
    );
  }
}

export default Dogs;
