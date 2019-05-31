import { HelloState } from '../../types/index';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../../constants/redux';
import { ApplicationAction } from 'src/redux/actions';

export function hello(state: HelloState = {enthusiasmLevel:1,languageName:"XXX"}, action: ApplicationAction): HelloState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
  }
  return state;
}
