import {createFeatureSelector, createSelector} from '@ngrx/store';

import * as fromCharts from './charts.reducer';

export const selectChartsState = createFeatureSelector<fromCharts.State>(
  fromCharts.chartsFeatureKey
);

export const selectChartsResultState = createSelector(selectChartsState, state => {
  return state?.data?.result;
});
