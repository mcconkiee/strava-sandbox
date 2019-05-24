import * as React from 'react';
import './Aut.css';

export interface Props {  
  authenticate?: () => void;
}


class Aut extends React.Component<Props, object> {
  render() {
    return (
      <div className="auth">
        <button onClick={this.props.authenticate}>-</button>        
      </div>
    );
  }
}

export default Aut;


