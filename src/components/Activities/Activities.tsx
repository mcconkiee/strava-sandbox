import * as React from "react";
import { ACTIVITIES_ROUTE } from "src/constants/routes";
import urlParams from "src/lib/url-params";
import List from "./List";
import Pagination from "./Pagination";
import { ActivityState, DogState, StravaAccount } from "src/types";

interface ActivityProps {
  dogs: DogState;
  activity: ActivityState;
  user?: StravaAccount;
  getActivitiesList: (page: number) => void;
  getDogs: () => void;
  getUser: () => void;
}
class Activities extends React.Component<ActivityProps> {
  constructor(p: ActivityProps) {
    super(p);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
  }
  componentDidUpdate(prevProps: ActivityProps) {
    if (!prevProps.user && this.props.user) {
      this.props.getDogs();
      const values = urlParams(this.props);
      if (values.page) {
        this.goToPage(parseInt(values.page));
      } else {
        this.props.getActivitiesList(this.props.activity.page);
      }
    }
  }

  goToPage(page: number) {
    this.props.getActivitiesList(page);
  }
  onNextPage() {
    const page: number = this.props.activity.page;
    this.goToPage(page + 1);
  }
  onPrevPage() {
    if (this.props.activity.page === 1) return;
    const page: number = this.props.activity.page;
    this.goToPage(page - 1);
  }
  render() {
    return (
      <div className={`${ACTIVITIES_ROUTE} uk-overflow-auto`}>        
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage} />
        <div>Page: {this.props.activity.page}</div>
        <List listItems={this.props.activity.activities} />
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage} />
        
      </div>
    );
  }
}

export default Activities;
