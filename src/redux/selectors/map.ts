import { createSelector } from 'reselect'
import { StoreState, MapState } from 'src/types';
export const getMapState = (state:StoreState) => state.map;

export const getZoom = createSelector(
  [getMapState],
  (map:MapState) => map.zoom
)

export const getCoordinates = createSelector(
  [getMapState],
  (map:MapState) => map.coordinates
)
