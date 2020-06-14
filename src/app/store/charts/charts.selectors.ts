import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCharts from './charts.reducer';

export const selectChartsState = createFeatureSelector<fromCharts.State>(
  fromCharts.chartsFeatureKey
);
