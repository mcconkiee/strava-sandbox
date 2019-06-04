import * as React from "react";

import { ACTIVITIES_ROUTE } from "src/constants/routes";

import List from "./List";
import Pagination from "./Pagination";
import { ActivityState, DogState } from "src/types";

interface ActivityProps{
  dogs:DogState;
  activity:ActivityState;
  getActivitiesList:(page:number)=>void;
  getDogs:()=>void;
}
class Activities extends React.Component<ActivityProps> {
  constructor(p:ActivityProps) {
    super(p);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
  }
  componentDidMount() {
    this.props.getActivitiesList(this.props.activity.page);
    this.props.getDogs();
  }

  onNextPage() {
    const page: number = this.props.activity.page;
    this.props.getActivitiesList(page + 1);
  }
  onPrevPage() {
    if (this.props.activity.page === 1) return;
    const page: number = this.props.activity.page;
    this.props.getActivitiesList(page - 1);
  }
  render() {
    
    return (
      <div className={`${ACTIVITIES_ROUTE} uk-overflow-auto`}>
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage} />
        <List listItems={this.props.activity.activities} />
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage} />
      </div>
    );
  }
}

export default Activities;
