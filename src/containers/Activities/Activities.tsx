import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Activities from '../../components/Activities/Activities';
import * as DefaultAction from '../../redux/actions';
import {ActivitiesListGet} from '../../redux/actions/activities'

import {  StoreState } from '../../types/index';

export function mapStateToProps(state: StoreState) {
  return state.activity;
}
export function mapDispatchToProps(dispatch: Dispatch<DefaultAction.ApplicationAction>) {
  return {    
    getActivitiesList:(page:number = 1)=> dispatch(ActivitiesListGet(page)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
