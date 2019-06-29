import * as React from 'react';
import Nav from 'src/components/Nav/Nav';




export function HasNav(Comp: React.ComponentClass): React.ComponentClass {
  class WrappedComponent extends React.Component {
    
    public render() {
      return <div>
          <Nav />
          <Comp {...this.props} />
      </div>;
    }
  }
  return WrappedComponent;
}

export default HasNav;
