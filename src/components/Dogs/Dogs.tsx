import * as React from "react";
import { authURL } from "src/constants/auth";
import HasUser from "src/containers/HOC/WithUser";
import { DogState, AuthState } from "src/types";
import "./Dogs.css";
interface DogUI {
  dogs: DogState;
  auth: AuthState;
  getDogs: () => void;
}
const doglist = (dogState: DogState) => {
  if (dogState.dogs) {
    if(dogState.dogs.length === 0){
      return null;
    }
    return dogState.dogs.map(dog => {
      return <div key={dog.id}>{dog.firstname}</div>;
    });
  }
  
  return null;
};
class Dogs extends React.Component<DogUI, object> {
  constructor(p: DogUI) {
    super(p);
    this.state = { fetchedDogs: false };
  }
  componentDidUpdate(prevProps:DogUI){
    if(!prevProps.auth.userData && this.props.auth.userData && !this.props.dogs.dogs){
      this.props.getDogs();
    }
  }
  listDogs(): React.ReactNode {
    if (this.props.dogs) {      
      return <div>{doglist(this.props.dogs)}</div>;
    }
    return null;
  }

  render() {
    return (
      <div className="dog">
        <h4>Your Dogs!</h4>
        <div>
          <a className="uk-button uk-button-primary" href={authURL(true)}>
            Add a Dog!
          </a>
        </div>
        {this.props.dogs.loading ? <div uk-spinner={1}></div> : null}
        <div>{this.listDogs()}</div>
      </div>
    );
  }
}

export default HasUser(Dogs);
