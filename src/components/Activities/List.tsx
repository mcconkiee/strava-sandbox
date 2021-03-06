import * as React from "react";
import Activity from "./Activity";
import { StravaActivity } from 'src/types';

export interface ListProps {
  listItems: Array<StravaActivity>;
}

const List = ({ listItems = [] }: ListProps) => {
  return (
    <table className="uk-table uk-table-small uk-table-divider">
      <thead>
        <tr>
          <th>Name</th>
          <th>Distance</th>
          <th>Date</th>
          <th>Matched</th>
        </tr>
      </thead>
      <tbody>
        {listItems.map(item => {
          return <Activity key={item.id} item={item} />;
        })}
      </tbody>
    </table>
  );
};
export default List;
