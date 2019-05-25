import * as React from 'react';
import './Auth.css';
import { AuthState } from 'src/types';
const queryString = require('query-string');



class Aut extends React.Component<AuthState, object> {
  componentDidMount(){
    const {location} = this.props;
    if(location){
      const values = queryString.parse(location.search);
      if(values.code){
        this.props.authenticateWithCode(values.code);
      }
    }
  }
  render() {
    console.log(window.location);
    
    return (
      <div className="auth">        
        Authpage
      </div>
    );
  }
}

export default Aut;


