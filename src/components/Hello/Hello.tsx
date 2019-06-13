import * as React from "react";
import { authURL } from "src/constants/auth";
import { HelloUIState } from 'src/containers/Hello/Hello';
import { Redirect } from 'react-router';
import { DOGS } from 'src/constants/routes';
import {IS_DEV} from 'src/lib/env';
import "./Hello.css";
import config from 'src/config';

class Hello extends React.Component<HelloUIState, object> {
  componentDidMount(){
    this.props.refreshToken();    
  }

  render() {
    if(this.props.userData){
      return <Redirect to={DOGS} />
    }
       
    return (
      <div className="hello">
        <div>
          <a href={authURL()}>Auth</a>
        </div>
        <div className="uk-text-small">
          <span>Build: ({config.build_num})</span>
          <span>{IS_DEV ? "DEV - ENV" : null}</span>
        </div>
        
      </div>
    );
  }
}

export default Hello;

