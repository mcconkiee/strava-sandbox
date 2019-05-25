import * as React from 'react';
import './Auth.css';
import { AuthState } from 'src/types';
import { Redirect } from 'react-router';
import { ACTIVITIES_ROUTE, AUTHCODE_ROUTE } from 'src/constants/routes';
const queryString = require('query-string');



class Auth extends React.Component<AuthState, object> {
  state = {redirect:false}
  componentDidMount(){
    const {location} = this.props;
    if(location){
      const values = queryString.parse(location.search);
      if(values.code){
        this.props.authenticateWithCode(values.code);
      }
    }
  }
  componentDidUpdate(prevProps:AuthState){
    if(!prevProps.accessToken && this.props.accessToken != null){
      this.setState({redirect:true})
    }
  }
  render() {
    if(this.state.redirect){
      return <Redirect to={ACTIVITIES_ROUTE} push/>
    }
    
    return (
      <div className={AUTHCODE_ROUTE}>        
        Authpage
      </div>
    );
  }
}

export default Auth;


