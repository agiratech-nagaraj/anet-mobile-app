import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromTimesheets from '../reducers/timesheets.reducer';

export const selectTimesheetsState = createFeatureSelector<fromTimesheets.State>(
  fromTimesheets.timesheetsFeatureKey
);

export const selectTimesheetsListState = createSelector(selectTimesheetsState, (state) => {
  return state?.data?.result?.timesheets ?? [];
});

export const selectTimesheetsCountState = createSelector(selectTimesheetsState, (state)=>{
  return state?.data?.result?.count;
});

export const selectTimesheetsLoader = createSelector(selectTimesheetsState, (state) => {
  return state.loading;
});

