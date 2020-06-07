import { createReducer, on} from '@ngrx/store';

import * as TimesheetsActions from '../actions/timesheets.actions';
import {TimesheetsResponse} from '../../../core/models/http/responses/timesheets.response';

export const timesheetsFeatureKey = 'timesheets';

export interface State {
  data: TimesheetsResponse;
  loading: boolean;
}

export const initialState: State = {
  data: null,
  loading: false,
};


export const reducer = createReducer(
  initialState,

  on(TimesheetsActions.loadTimesheetss, state => ({...state, loading: true})),
  on(TimesheetsActions.loadTimesheetssSuccess, (state, action) => ({...state, data: action.data, error: null, loading: false})),
  on(TimesheetsActions.loadTimesheetssFailure, (state, action) => ({...state, error: action.error, loading: false})),
  on(TimesheetsActions.clearTimesheets, (state, action) => ({...state, data: null, error: null})),
);

