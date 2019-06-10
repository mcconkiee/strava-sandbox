import * as React from "react";
import config from "src/config";
import { StravaActivity } from "src/types";
export interface MapProps {
  activity: StravaActivity;
  onMapClicked:()=>void;
}
const Map = (props: MapProps) => {
  const { activity } = props;
  const encodedPolyLine = encodeURIComponent(activity.map.summary_polyline);
  return (
    <div onClick={props.onMapClicked}>
      <img
      src={`https://api.mapbox.com/styles/v1/mcconkiee/cjbzmcuu970xq2qoyqbcytwme/static/path-2+f44(${encodedPolyLine})/auto/300x200?access_token=${
        config.mapBoxApi
      }`}
      alt={`${activity.id} image`}
    />
    </div>
  );
};
export default Map;
