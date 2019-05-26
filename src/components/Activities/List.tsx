import * as React from "react";
import Activity from './Activity';


export interface ListProps {
    listItems: Array<object>;
}
const showItems = (listItems: Array<object>) =>{    
    return listItems.map(item => {
    return <Activity key={item["id"]} item={item}/>;
  })
}

const List = ({listItems=[]}:ListProps) => {
  return <div>
      {showItems(listItems)}
  </div>;
};
export default List;
