import * as React from "react";
import ReactMapGL from "react-map-gl";
import configs from "src/config";
import { StravaActivity, ActivityState, MapState } from "src/types";
import PolylineOverlay from "./Polyline";


export interface ModalMapUI {
  activity: ActivityState;
  selectedActivity?: StravaActivity;
  map: MapState;
  deselectActivity: () => void;
}
const MAPBOX_TOKEN = configs.mapBoxApi || "";

const modalContent = (map: MapState) => {
  const actv = map.currentActivity;
  if (actv) {
    return (
      <div>
        <ReactMapGL
          width={map.width}
          height={map.height}
          latitude={map.mercator.latitude}
          longitude={map.mercator.longitude}
          zoom={map.zoom}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mcconkiee/ciulgcrup006f2irrq2e2xrsu"
          onViewportChange={viewport => {
            const { latitude, longitude, zoom } = viewport;
            console.log(zoom, latitude, longitude);
          }}
        >
          <PolylineOverlay points={map.coordinates} />
        </ReactMapGL>
        <div>{actv.name}</div>
      </div>
    );
  }
  return <div>no data for this activity found.</div>;
};

const ModalMap = (props: ModalMapUI) => {  
  return (
    <div id="modal-map" className="uk-flex-top" uk-modal={1}>
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        {modalContent(props.map)}
      </div>
    </div>
  );
};

export default ModalMap;
