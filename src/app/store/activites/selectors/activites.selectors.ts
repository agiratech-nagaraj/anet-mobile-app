import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromActivites from '../reducers/activites.reducer';

export const selectActivitesState = createFeatureSelector<fromActivites.State>(
  fromActivites.activitesFeatureKey
);
