import { createSelector } from 'reselect'
import { StoreState, ActivityState } from 'src/types';
export const getActivityState = (state:StoreState) => state.activity;

export const getAllActivities = createSelector(
  [getActivityState],
  (state:ActivityState) => state.activities
)

export const getLoading = createSelector(
  [getActivityState],
  (state:ActivityState) => state.loading
)
