import {createAction, props} from '@ngrx/store';

import {ChartsResponse} from '../../core/models/http/responses/charts.response';

export const initChartss = createAction(
  '[Charts] init Charts ',
  props<{ data: ChartsResponse }>()
);

export const loadChartss = createAction(
  '[Charts] Load Chartss',
  props<{ payload: { duration: string, activityId: string } }>()
);

export const loadChartssSuccess = createAction(
  '[Charts] Load Chartss Success',
  props<{ data: any }>()
);

export const loadChartssFailure = createAction(
  '[Charts] Load Chartss Failure',
  props<{ error: any }>()
);

export const clearChartss = createAction(
  '[Charts] Clear Charts '
);
