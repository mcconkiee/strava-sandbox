import * as React from 'react';
import { ACTIVITIES_ROUTE } from 'src/constants/routes';
import urlParams from 'src/lib/url-params';
import { ActivityState, DogState, StravaAccount } from 'src/types';

import List from './List';
import Pagination from './Pagination';

interface ActivityProps {
  dogs: DogState;
  activity: ActivityState;
  user?: StravaAccount;
  needsUpdate: boolean;
  refreshing: boolean;
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
  componentDidMount() {
    const values = urlParams(this.props);
    if (values.page) {
      if (this.props.activity.page !== parseInt(values.page)) {
        this.goToPage(parseInt(values.page));
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
    if (this.props.refreshing) {
      return <div uk-spinner={1} />;
    }
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
