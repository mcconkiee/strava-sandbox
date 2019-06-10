import * as React from "react";
import ReactMapGL from "react-map-gl";
import configs from "src/config";
import { StravaActivity, ActivityState } from "src/types";

export interface ModalMapUI {
  activity: ActivityState;
  selectedActivity?: StravaActivity;
  deselectActivity: () => void;
}
const MAPBOX_TOKEN = configs.mapBoxApi || "";

const ModalMap = (props: ModalMapUI) => {
  if (!props.selectedActivity) {
    return null;
  }
  console.log(props.selectedActivity,'selected activity!!');
  
  return (
    <div id="modal-map" className="uk-flex-top" uk-modal={1}>
      <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
        <div>
            <ReactMapGL
          width={"100%"}
          height={400}
          latitude={37.7577}
          longitude={-122.4376}
          zoom={8}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mcconkiee/ciulgcrup006f2irrq2e2xrsu"
          onViewportChange={viewport => {
            const { latitude, longitude, zoom } = viewport;
            console.log(zoom, latitude, longitude);

            // Optionally call `setState` and use the state to update the map.
          }}
        >
            
        </ReactMapGL>
        <div>
            {props.selectedActivity.name}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMap;
