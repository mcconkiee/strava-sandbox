import * as React from 'react';
import './Hello.css';
import { HelloState } from 'src/types';
import config from 'src/config';

class Hello extends React.Component<HelloState, object> {
  
  render() {
    const { languageName, enthusiasmLevel = 1 } = this.props;

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {languageName + getExclamationMarks(enthusiasmLevel)}
        </div>
        <div>
          <a href={`https://www.strava.com/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=code`}>Auth</a>
        <button onClick={this.props.onDecrement}>-</button>
        <button onClick={this.props.onIncrement}>+</button>
      </div>
      </div>
    );
  }
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
