import * as React from "react";
import ReactMapGL, { NavigationControl, ViewStateChangeInfo } from "react-map-gl";
import configs from "src/config";
import { StravaActivity, ActivityState, MapState } from "src/types";
import PolylineOverlay from "./Polyline";

const navStyle: React.CSSProperties = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

export interface ModalMapUI {
  activity: ActivityState;
  selectedActivity?: StravaActivity;
  map: MapState;
  deselectActivity: () => void;
  updateMap:(state:MapState)=>void;
}
const MAPBOX_TOKEN = configs.mapBoxApi || "";


const modalContent = (map: MapState,props: ModalMapUI) => {
  const actv = map.currentActivity;
  if (actv) {
    return (
      <div>
        <ReactMapGL
          width="100%"
          height={map.height || 400}
          latitude={map.latitude}
          longitude={map.longitude}
          zoom={map.zoom}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mcconkiee/ciulgcrup006f2irrq2e2xrsu"
          onViewportChange={viewport => {
            const { latitude, longitude } = viewport;
            props.updateMap({latitude:latitude, longitude:longitude})
          }}
         
        >
          <PolylineOverlay points={map.coordinates} />
          <div className="nav" style={navStyle}>
          <NavigationControl onViewStateChange={(viewstate:ViewStateChangeInfo)=>{
            map.zoom = viewstate.viewState.zoom;
            props.updateMap(map)            
          }} showCompass={false} />
        </div>
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
        {modalContent(props.map,props)}
      </div>
    </div>
  );
};

export default ModalMap;
