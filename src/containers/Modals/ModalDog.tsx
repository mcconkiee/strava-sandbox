import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AddDog } from 'src/redux/actions/dogs';
import { getUser } from 'src/redux/selectors/auth';
import { getDogError } from 'src/redux/selectors/dogs';

import Dog from '../../components/Dogs/ModalAddDog';
import { DogObject, StoreState } from '../../types';

const mapStateToProps = (state: StoreState) => ({
    user: getUser(state),
    error: getDogError(state)
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
    addDog: (dog: DogObject) => dispatch(AddDog(dog)),
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dog);
