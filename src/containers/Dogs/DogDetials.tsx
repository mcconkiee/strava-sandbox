import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { GetDog } from 'src/redux/actions/dogs';
import { getDogsLoading, getCurrentDog } from 'src/redux/selectors/dogs';

import DogDetails from '../../components/Dogs/DogDetails';
import { StoreState } from '../../types';



const mapStateToProps = (state: StoreState) => ({  
  refreshing: getDogsLoading(state),
  dog: getCurrentDog(state)
})
const mapDispatchToProps = (
  dispatch: Dispatch
)=> ({
  getDog:(dogPath:string)=>(dispatch(GetDog(dogPath)))
})

const enhanced =  compose(connect(mapStateToProps,mapDispatchToProps))
export default enhanced(DogDetails);