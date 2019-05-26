import * as React from "react";
import { ActivityState } from "src/types";
import { ACTIVITIES_ROUTE, REAUTH } from "src/constants/routes";
import { Redirect } from "react-router";
import List from "./List";
import Pagination from './Pagination';

interface ActivitiesState {
 
}
class Activities extends React.Component<ActivityState, ActivitiesState> {
 
  constructor(p:ActivityState){
    super(p);
    this.onNextPage = this.onNextPage.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
  }
  componentDidMount() {
    this.props.getActivitiesList(this.props.page);
  }
  
  onNextPage(){
    const page:number = this.props.page ;
    this.props.getActivitiesList(page + 1);
    
  }
  onPrevPage(){
    if(this.props.page === 1)
      return;
    const page:number = this.props.page;
    this.props.getActivitiesList(page - 1);
  }
  render() {
    if (this.props.error) {
      return <Redirect to={REAUTH} push />;
    }
    return (
      <div className={`${ACTIVITIES_ROUTE} uk-overflow-auto`}>
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage}/>
        <List listItems={this.props.activities} />
        <Pagination onNext={this.onNextPage} onPrev={this.onPrevPage}/>
      </div>
    );
  }
}

export default Activities;
