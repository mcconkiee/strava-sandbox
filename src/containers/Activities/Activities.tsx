import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Activities from '../../components/Activities/Activities';
import {ActivitiesListGet} from '../../redux/actions/activities'
import {GetDogs} from '../../redux/actions/dogs'

import {  StoreState } from '../../types/index';

export function mapStateToProps(state: StoreState) {
  return state.activity;
}
export function mapDispatchToProps(dispatch: Dispatch) {
  return {    
    getActivitiesList:(page:number = 1)=> dispatch(ActivitiesListGet(page)),
    getDogs:()=> dispatch(GetDogs())    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
