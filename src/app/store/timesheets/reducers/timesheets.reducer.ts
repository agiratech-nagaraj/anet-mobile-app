import {Action, createReducer, on} from '@ngrx/store';
import * as TimesheetsActions from '../actions/timesheets.actions';
import {TimesheetsResponse} from '../../../core/models/http/responses/timesheets.response';

export const timesheetsFeatureKey = 'timesheets';

export interface State {
  data: TimesheetsResponse;
}

export const initialState: State = {
  data: null
};


export const reducer = createReducer(
  initialState,

  on(TimesheetsActions.loadTimesheetss, state => state),
  on(TimesheetsActions.loadTimesheetssSuccess, (state, action) => ({...state, data: action.data})),
  on(TimesheetsActions.loadTimesheetssFailure, (state, action) => ({...state, error: action.error})),
  on(TimesheetsActions.clearTimesheets, (state, action) => ({data: null, error: null})),
);

