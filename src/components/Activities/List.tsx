import * as React from "react";
export interface ListProps {
    listItems: Array<object>;
}
const showItems = (listItems: Array<object>) =>
  listItems.map(item => {
    return <div>{item["name"]}</div>;
  });
  
const List = ({listItems=[]}:ListProps) => {
    console.log(listItems);
    
    
  return <div>hola
      {showItems(listItems)}
  </div>;
};
export default List;
