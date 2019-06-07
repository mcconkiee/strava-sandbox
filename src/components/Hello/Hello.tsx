import * as React from "react";
import "./Hello.css";
import { authURL } from "src/constants/auth";
import { HelloUIState } from 'src/containers/Hello/Hello';
import { Redirect } from 'react-router';
import { DOGS } from 'src/constants/routes';

class Hello extends React.Component<HelloUIState, object> {
  componentDidMount(){
    this.props.refreshToken();    
  }

  render() {
    if(this.props.userData){
      return <Redirect to={DOGS} />
    }
    
    let isDev = false;
    if(process.env.NODE_ENV){
      isDev = process.env.NODE_ENV.toLowerCase() === "development"
    }
    return (
      <div className="hello">
        <div>
          <a href={authURL()}>Auth</a>
        </div>
        {isDev ? "DEV - ENV" : null}
      </div>
    );
  }
}

export default Hello;

