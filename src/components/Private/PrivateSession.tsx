import * as React from 'react'
import { PrivateSessionState } from 'src/containers/Private/PrivateSession';



const PrivateSession = (props:PrivateSessionState)=>{
    console.log(props.auth.refreshing);
    
    if(props.auth.userData){        
        return <div className="private">
        {props.children}
    </div>
    }
    if(props.auth.refreshing){
        return <div uk-spinner={1} ></div>
    }
    return null;
}

export default PrivateSession;
