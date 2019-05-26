import * as React from "react";
const moment = require('moment');
export interface Activity {
    item:object;
}
const Activity = (item:Activity)=>{
    return <div>{item.item["name"]} ({moment(item.item["start_date"]).format("MMM DD, YYYY h:mm a")})</div>
}
export default Activity;
