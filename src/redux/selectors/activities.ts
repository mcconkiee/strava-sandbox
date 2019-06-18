import { createSelector } from 'reselect'
import { StoreState, ActivityState } from 'src/types';
export const getActivityState = (state:StoreState) => state.activity;

export const getAllActivities = createSelector(
  [getActivityState],
  (state:ActivityState) => state.activities
)

export const getSelectedActivity = createSelector(
  [getActivityState],
  (state:ActivityState) => state.selectedActivity
)

export const getLoadingActivities = createSelector(
  [getActivityState],
  (state:ActivityState) => state.loading
)

export const getCurrentPage = createSelector(
  [getActivityState],
  (state:ActivityState) => state.page
)

export const getNeedsRefresh = createSelector(getActivityState,(state)=>state.needsRefresh);
