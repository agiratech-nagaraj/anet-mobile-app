import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromTimesheets from '../reducers/timesheets.reducer';

export const selectTimesheetsState = createFeatureSelector<fromTimesheets.State>(
  fromTimesheets.timesheetsFeatureKey
);

export const selectTimesheetsListState = createSelector(selectTimesheetsState, (state) => {
  return state?.data?.result?.timesheets ?? [];
});
