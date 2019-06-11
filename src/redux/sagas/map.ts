
import { put, takeLatest, select } from 'redux-saga/effects'
import WebMercatorViewport from 'viewport-mercator-project';
import { ApplicationAction } from '../actions';
import { ACTIVITY_SELECTED } from 'src/constants/redux';
import { setMapActivitySuccess, mapError } from '../actions/map';
import { StravaActivity, MapState } from 'src/types';
import mapboxgl from 'mapbox-gl';
import { getMapState } from '../selectors/map';
const polyline = require("@mapbox/polyline");

function* updateMapStateWithActivity(action: ApplicationAction) {
    try {
        
        const activity: StravaActivity = action.payload;
        const curLine = polyline.toGeoJSON(activity.map.summary_polyline);
        const coordinates = curLine.coordinates;        
        const bounds = coordinates.reduce(function (bounds: any, coord: number[]) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));    
        const mBounds:[[number,number],[number,number]] = [[bounds.getSouthWest().lng, bounds.getSouthWest().lat],[bounds.getNorthEast().lng, bounds.getNorthEast().lat]];
        const curstate: MapState = yield select(getMapState);
        const obj = {latitude:activity.start_latitude,longitude:activity.start_longitude,width:curstate.width, height: curstate.height}
        const mercator = new WebMercatorViewport(obj)
            .fitBounds(mBounds, {
              padding: 20,
              offset: [0, 0]
            });
        //create a new mapstate        
        const newMapState: MapState = { currentActivity: activity, latitude: mercator.latitude, longitude: mercator.longitude, zoom: mercator.zoom, coordinates: coordinates, bounds:bounds,mercator:mercator ,width:curstate.width, height: curstate.height}
        yield put(setMapActivitySuccess(newMapState));
    } catch (error) {
        yield put(mapError(error));
    }
}


export const map = [
    takeLatest(ACTIVITY_SELECTED, updateMapStateWithActivity),

]
