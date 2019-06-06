import * as React from "react";
import config from "src/config";
import { StravaActivity } from "src/types";
export interface MapProps {
  activity: StravaActivity;
}
const Map = (props: MapProps) => {
  const { activity } = props;
  const encodedPolyLine = encodeURIComponent(activity.map.summary_polyline);
  return (
    <img
      src={`https://api.mapbox.com/styles/v1/mcconkiee/cjbzmcuu970xq2qoyqbcytwme/static/path-2+f44(${encodedPolyLine})/auto/300x200?access_token=${
        config.mapBoxApi
      }`}
      alt={`${activity.id} image`}
    />
  );
};
export default Map;
