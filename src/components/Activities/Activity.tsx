import * as React from "react";
const moment = require("moment");
export interface Activity {
  item: object;
}
const Activity = (item: Activity) => {
  return (
    <tr>
      <td>{item.item["name"]}</td>
      <td>{moment(item.item["start_date"]).format("MMM DD, YYYY h:mm a")}</td>
    </tr>
  );
};
export default Activity;
