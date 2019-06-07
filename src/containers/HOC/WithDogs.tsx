import * as React from "react";
import { connect } from "react-redux";
import { StoreState, DogState } from "src/types";
import { getDogState } from "src/redux/selectors/dogs";
import { getLoading } from "src/redux/selectors/activities";
import { Dispatch } from "redux";
import { GetDogs } from "src/redux/actions/dogs";

export interface WithDogs {  
  dogs: DogState;
  loading: boolean;
  getDogs: () => void;
}
interface StateFromProps {
  dogs: DogState;
  loading: boolean;
}

interface DispatchFromProps {
  getDogs: () => void;
}

const mapStateToProps = (state: StoreState): StateFromProps => ({
  dogs: getDogState(state),  
  loading: getLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
  getDogs: () => dispatch(GetDogs())
});

export function HasDogs(Comp: React.ComponentClass): React.ComponentClass {
  class WrappedComponent extends React.Component<WithDogs> {
    componentDidMount() {
      if (!this.props.dogs.dogs) {
        this.props.getDogs();
      }
    }
    public render() {
      return <Comp {...this.props} />;
    }
  }
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WrappedComponent);
}

export default HasDogs;
