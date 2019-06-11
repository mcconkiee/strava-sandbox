import { MapState } from '../../types/index';
import { MAP_SET_NEW_ACTIVITY, MAP_ERROR } from '../../constants/redux';
import { ApplicationAction } from 'src/redux/actions';
const initialState: MapState = { latitude: 0, longitude: 0, zoom: 10, width: 450, height: 400 }
export function map(state: MapState = initialState, action: ApplicationAction): MapState {
    switch (action.type) {
        case MAP_SET_NEW_ACTIVITY:
            const mapState: MapState = action.payload
            return { ...state, ...mapState }
        case MAP_ERROR:
            return { ...state, error: action.payload }
    }
    return state;
}
