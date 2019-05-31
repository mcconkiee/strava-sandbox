import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Hello from '../../components/Hello/Hello';
import * as actions from '../../redux/actions/hello';
import { StoreState } from '../../types/index';

export function mapStateToProps(state: StoreState) {
  return state.hello;
}
export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
