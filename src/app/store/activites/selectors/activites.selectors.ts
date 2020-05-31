import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromActivites from '../reducers/activites.reducer';

export const selectActivitesState = createFeatureSelector<fromActivites.State>(
  fromActivites.activitesFeatureKey
);

export const selectActivitiesListState = createSelector(selectActivitesState, (res) => {
  return res?.data?.result ?? [];
});

export const selectActivitiesLoader = createSelector(selectActivitesState, (state) => {
  return state.loading;
});
