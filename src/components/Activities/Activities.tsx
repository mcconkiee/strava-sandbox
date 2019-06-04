import * as React from "react";

import { ACTIVITIES_ROUTE } from "src/constants/routes";

import List from "./List";
import Pagination from "./Pagination";
import { ActivityState } from "src/types";

class Activities extends React.Component<ActivityState> {
  constructor(p: ActivityState) {
    super(p);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
  }
  componentDidMount() {
    this.props.getActivitiesList(this.props.page);
    if (this.props.getDogs) this.props.getDogs();
  }

  onNextPage() {
    const page: number = this.props.page;
    this.props.getActivitiesList(page + 1);
  }
  onPrevPage() {
    if (this.props.page === 1) return;
    const page: number = this.props.page;
    this.props.getActivitiesList(page - 1);
  }
  render() {
    
    return (
      <div className={`${ACTIVITIES_ROUTE} uk-overflow-auto`}>
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage} />
        <List listItems={this.props.activities} />
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage} />
      </div>
    );
  }
}

export default Activities;
