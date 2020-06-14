import {createReducer, on} from '@ngrx/store';

import * as ChartsActions from './charts.actions';
import {ChartsResponse} from '../../core/models/http/responses/charts.response';

export const chartsFeatureKey = 'charts';

export interface State {
  data: ChartsResponse;
  error: any;
  loading: boolean;
  payload: { duration: string, activityId: string };
}

export const initialState: State = {
  data: null,
  error: null,
  loading: false,
  payload: null,
};


export const reducer = createReducer(
  initialState,
  on(ChartsActions.initChartss, (state, action) => ({...state, data: action.data})),
  on(ChartsActions.loadChartss, (state, action) => {
    return {
      ...state,
      payload: action.payload,
      loading: true
    };
  }),
  on(ChartsActions.loadChartssSuccess, (state, action) => {
    return {
      ...state,
      data: action.data,
      loading: false,
      error: null,
    };
  }),
  on(ChartsActions.loadChartssFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
      data: null,
    };
  }),
  on(ChartsActions.clearChartss, state => initialState),
);

